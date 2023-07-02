import { $ } from 'execa'
import { window, workspace } from 'vscode'

import { type HerokuApp } from './types'
import { exec } from '../helpers/exec'
import { handleError } from '../helpers/handleError'
import { showProgressNotification } from '../helpers/showProgressNotification'
import { statusBarItemManager } from '../libs/StatusBarItemManager'
import { UserError } from '../libs/UserError'

export async function linkWorkspaceToHerokuApp() {
  try {
    const firstWorkspaceFolder = workspace.workspaceFolders?.at(0)
    if (!firstWorkspaceFolder) {
      return
    }

    const currentWorkspaceDirectoryPath = firstWorkspaceFolder.uri.fsPath

    const herokuAppsNames = await showProgressNotification('Listing current Heroku apps...', async () => {
      const { stdout: herokuAppsAsJson } = await exec(`heroku apps -A --json`, { shouldThrowOnStderr: true })

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

    statusBarItemManager.load()

    window.showInformationMessage(`Your current workspace is now linked to the  "${herokuAppName}" Heroku app.`)
  } catch (err) {
    handleError(err)
  }
}
