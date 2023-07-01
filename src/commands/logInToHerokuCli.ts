import { spawn } from 'child_process'
import { EOL } from 'os'
import { window } from 'vscode'

import { handleError } from '../helpers/handleError'

export async function logInToHerokuCli() {
  try {
    await new Promise(resolve => {
      const child = spawn('heroku', ['login'])
      child.stderr.pipe(process.stderr)
      child.stdout.pipe(process.stdout)

      child.on('exit', resolve)

      child.stdin.write(EOL)
      child.stdin.end()
    })

    window.showInformationMessage('You are now logged in to Heroku CLI.')
  } catch (err) {
    handleError(err)
  }
}
