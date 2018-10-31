@labshare/services-msi-cli
==========================

Generates a MSI for a Node.js API service

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@labshare/services-msi-cli.svg)](https://npmjs.org/package/@labshare/services-msi-cli)
[![Build Status](https://travis-ci.com/LabShare/services-msi-cli.svg?branch=master)](https://travis-ci.com/LabShare/services-msi-cli)
[![Codecov](https://codecov.io/gh/LabShare/services-msi-cli/branch/master/graph/badge.svg)](https://codecov.io/gh/LabShare/services-msi-cli)
[![Downloads/week](https://img.shields.io/npm/dw/@labshare/services-msi-cli.svg)](https://npmjs.org/package/@labshare/services-msi-cli)
[![License](https://img.shields.io/npm/l/@labshare/services-msi-cli.svg)](https://github.com/LabShare/services-msi-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @labshare/services-msi-cli
$ services-msi COMMAND
running command...
$ services-msi (-v|--version|version)
@labshare/services-msi-cli/1.2.0 linux-x64 node-v10.13.0
$ services-msi --help [COMMAND]
USAGE
  $ services-msi COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`services-msi bundle`](#services-msi-bundle)
* [`services-msi help [COMMAND]`](#services-msi-help-command)

## `services-msi bundle`

Creates an MSI for a Node.js API project. Requires Windows and the http://wixtoolset.org/ toolchain installed.

```
USAGE
  $ services-msi bundle

OPTIONS
  -h, --help           show CLI help
  -i, --ini=ini        Path to INI format configuration file for customizing placeholder values
  -o, --output=output  [default: /home/travis/build/LabShare/services-msi-cli] Installer output folder
  -s, --source=source  [default: /home/travis/build/LabShare/services-msi-cli] Project source folder

EXAMPLES
  $ services-msi bundle
  $ services-msi bundle --output /output/dir --source /my/node/project
  Generates "<project-name>-<project-version>.msi"
  $ services-msi bundle --ini path/to/config.ini
  Customizes placeholder values with the given config file. View the 
  https://github.com/LabShare/services-msi-cli/blob/master/example-config.ini for accepted values.
```

_See code: [src/commands/bundle.ts](https://github.com/LabShare/services-msi-cli/blob/v1.2.0/src/commands/bundle.ts)_

## `services-msi help [COMMAND]`

display help for services-msi

```
USAGE
  $ services-msi help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.3/src/commands/help.ts)_
<!-- commandsstop -->
