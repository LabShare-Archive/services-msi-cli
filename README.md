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
@labshare/services-msi-cli/0.0.0 darwin-x64 node-v8.11.2
$ services-msi --help [COMMAND]
USAGE
  $ services-msi COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`services-msi hello [FILE]`](#services-msi-hello-file)
* [`services-msi help [COMMAND]`](#services-msi-help-command)

## `services-msi hello [FILE]`

describe the command here

```
USAGE
  $ services-msi hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ services-msi hello
  hello world from ./src/bundle.ts!
```

_See code: [src/commands/bundle.ts](https://github.com/LabShare/services-msi-cli/blob/v0.0.0/src/commands/bundle.ts)_

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
