import {Command, flags} from '@oclif/command'
import {execSync} from 'child_process'
import cli from 'cli-ux'
import dashify = require('dashify')
import * as fs from 'fs'
import * as gulp from 'gulp'
import * as template from 'gulp-template'
import ini = require('ini')
import * as path from 'path'
import readPkg = require('read-pkg')
import temp = require('temp')
import uuidv4 = require('uuid/v4')
import which = require('which')
import {merge} from 'lodash'

export default class Bundle extends Command {
  static description = 'Creates an MSI for a Node.js API project. Requires Windows and the http://wixtoolset.org/' +
    ' toolchain installed.'

  static examples = [
    '$ services-msi bundle',
    '$ services-msi bundle --output /output/dir --source /my/node/project',
    'Generates "<project-name>-<project-version>.msi"',
    '$ services-msi bundle --ini path/to/config.ini',
    'Customizes placeholder values with the given config file. View the' +
    ' https://github.com/LabShare/services-msi-cli/blob/master/example-config.ini for accepted values.'
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    source: flags.string({
      char: 's',
      description: 'Project source folder',
      default: process.cwd
    }),
    output: flags.string({
      char: 'o',
      description: 'Installer output folder',
      default: process.cwd
    }),
    ini: flags.string({
      char: 'i',
      description: 'Path to INI format configuration file for customizing placeholder values'
    })
  }

  async run() {
    const {flags} = this.parse(Bundle)
    const installerFilesRoot = path.resolve(__dirname, '..', 'lib', 'installer')

    try {
      const pkg = readPkg.sync({cwd: flags.source} as any)

      // Create a temp directory for the project distribution files
      const projectTemp = temp.mkdirSync('api-')

      // Create another temp directory for the WiX files
      const wixTemp = temp.mkdirSync('wix-')

      let iniConfig = {
        installer: {
          icon: path.join(installerFilesRoot, 'icon.ico'),
          license: path.join(installerFilesRoot, 'license.rtf')
        },
        api: {
          // tslint:disable-next-line:no-http-string
          url: 'http://localhost:8000'
        },
        service: {
          name: 'labshare-service',
          params: 'index.js'
        },
        product: {
          name: pkg.name,
          company: 'LabShare'
        },
        tools: {
          wix: ''
        }
      }

      // Override defaults using the INI configuration file
      if (flags.ini) {
        iniConfig = merge(iniConfig, ini.parse(fs.readFileSync(flags.ini, 'utf-8')))
      }

      const placeholderValues = {
        windowsServiceName: iniConfig.service.name,
        windowsServiceParams: iniConfig.service.params,
        installerProductId: uuidv4(),
        installerUpgradeCode: uuidv4(),
        packageDescription: pkg.description || 'LabShare API service',
        company: iniConfig.product.company,
        version: pkg.version,
        productName: iniConfig.product.name,
        productIcon: iniConfig.installer.icon,
        msiLicense: iniConfig.installer.license,
        apiStartUrl: iniConfig.api.url,
        nodePath: which.sync('node'),

        // Since the nssm executable is only ~250KB, it is bundled with the CLI
        nssmPath: path.resolve(__dirname, '..', 'lib', 'binaries', 'nssm.exe')
      }

      cli.action.start('Copying project files to temporary directory', 'done', {stdout: true})

      // Copy project files to project temp directory
      await Promise.all([
        new Promise(resolve => {
          gulp
            .src([
              `${flags.source}/**/*`
            ])
            .pipe(gulp.dest(projectTemp))
            .on('end', () => {
              this.log(`Successfully copied project files to "${projectTemp}"`)
              resolve()
            })
        }),
        // Copy WiX templates to second temp directory and inject values into placeholders
        new Promise(resolve => {
          gulp
            .src([
              `${__dirname}/../lib/wix-templates/**`
            ])
            .pipe(template(placeholderValues, {}))
            .pipe(gulp.dest(wixTemp))
            .on('end', () => {
              this.log(`Successfully copied WiX templates to "${wixTemp}"`)
              resolve()
            })
        })
      ])

      cli.action.stop()

      const wixOutput = `${wixTemp}/output`
      const cmdOptions = {cwd: iniConfig.tools.wix}

      // Example: product-name-v1.2.3.msi
      const installerName = `${dashify(placeholderValues.productName)}-${placeholderValues.version}.msi`
      const installerPath = path.resolve(flags.output as string, installerName)

      cli.action.start(`Creating installer "${installerName}" with WiX toolchain`, 'done', {stdout: true})

      // See: http://wixtoolset.org/
      execSync(`"heat.exe" dir "${projectTemp}" -srd -dr INSTALLDIR -cg MainComponentGroup -out "${wixTemp}/directory.wxs" -ke -sfrag -gg -var var.SourceDir -sreg -scom`, cmdOptions)

      // Note: candle's -o argument requires a slash suffix or the command will fail with an error
      execSync(`"candle.exe" -dSourceDir="${projectTemp}" "${wixTemp}/*.wxs" -o "${wixOutput}/" -ext WiXUtilExtension`, cmdOptions)
      execSync(`"light.exe" -o "${installerPath}" "${wixOutput}/*.wixobj" -cultures:en-US -ext WixUIExtension.dll -ext WiXUtilExtension`, cmdOptions)

      cli.action.stop()
    } catch (error) {
      if (error.stdout || error.stderr) {
        this.error(`${error.stdout} ${error.stderr}`, {exit: -1})
      }

      this.error(error, {exit: -1})
    } finally {
      // Always cleanup temp directories
      temp.cleanupSync()
    }
  }
}
