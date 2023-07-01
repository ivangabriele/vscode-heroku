import { window } from 'vscode'

import { exec } from '../helpers/exec'
import { handleError } from '../helpers/handleError'
import { showProgressNotification } from '../helpers/showProgressNotification'

export async function logOutOfHerokuCli() {
  try {
    await showProgressNotification('Logging out from Heroku...', async () => {
      await exec('heroku logout')
    })

    window.showInformationMessage('You are now logged out of Heroku CLI.')
  } catch (err) {
    handleError(err)
  }
}
