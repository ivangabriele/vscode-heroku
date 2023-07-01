import { $ } from 'execa'
import { window } from 'vscode'

import { handleError } from '../helpers/handleError'
import { showProgressNotification } from '../helpers/showProgressNotification'

export async function logOutHeroku() {
  try {
    await showProgressNotification('Logging out from Heroku...', async () => {
      await $`heroku logout`
    })

    window.showInformationMessage('You are now logged out from Heroku.')
  } catch (err) {
    handleError(err)
  }
}
