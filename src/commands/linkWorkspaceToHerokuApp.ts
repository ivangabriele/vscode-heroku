import { $ } from 'execa'
import { window, workspace } from 'vscode'

import { HerokuApp } from './types'
import { handleError } from '../helpers/handleError'
import { showProgressNotification } from '../helpers/showProgressNotification'
import { UserError } from '../libs/UserError'

export async function linkWorkspaceToHerokuApp() {
  try {
    if (!workspace.workspaceFolders) {
      return
    }

    const currentWorkspaceDirectoryPath = workspace.workspaceFolders[0].uri.fsPath

    const herokuAppsNames = await showProgressNotification('Listing current Heroku apps...', async () => {
      const { stderr, stdout: herokuAppsAsJson } = await $({
        cwd: currentWorkspaceDirectoryPath,
      })`heroku apps -A --json`
      if (stderr) {
        throw new UserError('An error happened while trying to list your currents Heroku apps.', stderr)
      }

      const herokuAppsJson = JSON.parse(herokuAppsAsJson.trim()) as HerokuApp[]

      return herokuAppsJson.map(({ name }) => name)
    })

    const herokuAppName = await window.showQuickPick(herokuAppsNames)
    if (herokuAppName === undefined) {
      return
    }

    await showProgressNotification(`Linking current workspace to "${herokuAppName}"...`, async () => {
      const { stderr } = await $({
        cwd: currentWorkspaceDirectoryPath,
      })`heroku git:remote -a ${herokuAppName}`
      if (stderr) {
        throw new UserError(
          `An error happened while linking your "${herokuAppName}" Heroku app to the current workspace.`,
          stderr,
        )
      }
    })

    window.showInformationMessage(`Your current workspace is now linked to the  "${herokuAppName}" Heroku app.`)
  } catch (err) {
    handleError(err)
  }
}
