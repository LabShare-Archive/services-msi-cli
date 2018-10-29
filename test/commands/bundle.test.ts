import {expect, test} from '@oclif/test'
import {resolve} from 'path'
import * as cp from 'child_process'

describe('bundle', () => {
  test
    .stdout()
    .stderr()
    .stub(cp, 'execSync', () => 'Success')
    .command(['bundle', '--source', resolve(__dirname, '..', 'fixtures', 'example-project')])
    .it('runs bundle', ctx => {
      expect(ctx.stdout).to.contain('Creating installer "labshare-services-msi-cli-0.0.0.msi" with WiX toolchain...')
    })
})
