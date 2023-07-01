import { spawn } from 'child_process'
import { EOL } from 'os'
import { window } from 'vscode'

import { handleError } from '../helpers/handleError'

export async function logIntoHeroku() {
  try {
    const child = spawn('heroku', ['login'])
    // child.stdin.setEncoding('utf-8')
    child.stderr.pipe(process.stderr)
    // child.stdout.pipe(process.stdout)
    child.stdin.write(EOL)
    child.stdin.end()

    window.showInformationMessage('You are now logged into Heroku.')
  } catch (err) {
    handleError(err)
  }
}
