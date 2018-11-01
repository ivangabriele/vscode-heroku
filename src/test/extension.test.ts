import * as assert from 'assert'
import to from 'await-to-js'
import * as fs from 'fs-extra'
import * as path from 'path'

import exec from '../helpers/exec'

suite("Heroku Extension Tests", () => {
  const fixturesPath = path.join(__dirname, 'fixtures')
  const fixturesSourcePath = path.join(__dirname, '..', '..', 'src', 'test', 'fixtures')

  suiteSetup(() => {
    fs.copySync(path.join(fixturesSourcePath, 'sample.md'), path.join(fixturesPath, 'sample.md'))
  })

  test("Test helpers/exec()", async () => {
    let command, args
    switch (process.platform) {
      case 'win32':
      command = 'type'
      break

      default:
      command = 'cat'
      break
    }

    const [err, out] = await to(exec(command, [path.join(fixturesPath, 'sample.md')]))

    assert.strictEqual(null, err)
    assert.strictEqual(`# Hello World !\n`, out)
  })
})
