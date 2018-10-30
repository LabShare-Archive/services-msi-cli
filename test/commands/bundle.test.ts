import {expect, test} from '@oclif/test'
import {resolve} from 'path'
import * as cp from 'child_process'

describe('bundle', () => {
  const fixtures = resolve(__dirname, '..', 'fixtures')

  test
    .stdout()
    .stderr()
    .stub(cp, 'execSync', () => 'Success')
    .command([
      'bundle',
      '--source', resolve(fixtures, 'example-project')
    ])
    .it('runs bundle with a custom source directory', ctx => {
      expect(ctx.stdout).to.contain('Creating installer "nodejs-msi-0.0.3.msi" with WiX toolchain...')
    })

  test
    .stdout()
    .stderr()
    .stub(cp, 'execSync', () => 'Success')
    .command([
      'bundle',
      '--source', resolve(fixtures, 'example-project'),
      '--ini', resolve(fixtures, 'test-config.ini')
    ])
    .it('runs bundle with an INI config file', ctx => {
      expect(ctx.stdout).to.contain('Creating installer "my-product-0.0.3.msi" with WiX toolchain...')
    })
})
