import { commands, type ExtensionContext, workspace } from 'vscode'

import { linkWorkspaceToHerokuApp } from './commands/linkWorkspaceToHerokuApp'
import { logInToHerokuCli } from './commands/logInToHerokuCli'
import { logOutOfHerokuCli } from './commands/logOutOfHerokuCli'
import { handleError } from './helpers/handleError'
import { statusBarItemManager } from './libs/StatusBarItemManager'

export async function activate(context: ExtensionContext) {
  try {
    // -------------------------------------------------------------------------
    // Are we in a workspace?

    if (!workspace.workspaceFolders || workspace.workspaceFolders.length === 0) {
      return
    }

    // -------------------------------------------------------------------------
    // Register Heroku commands

    const linkWorkspaceToHerokuAppDisposable = commands.registerCommand(
      'extension.vscode-heroku.linkWorkspaceToHerokuApp',
      linkWorkspaceToHerokuApp,
    )
    const logInToHerokuCliDisposable = commands.registerCommand(
      'extension.vscode-heroku.logInToHerokuCli',
      logInToHerokuCli,
    )
    const logOutOfHerokuCliDisposable = commands.registerCommand(
      'extension.vscode-heroku.logOutOfHerokuCli',
      logOutOfHerokuCli,
    )

    context.subscriptions.push(linkWorkspaceToHerokuAppDisposable)
    context.subscriptions.push(logInToHerokuCliDisposable)
    context.subscriptions.push(logOutOfHerokuCliDisposable)

    // -------------------------------------------------------------------------
    // Launch Heroku Status Bar Item

    statusBarItemManager.load(true)
  } catch (err) {
    handleError(err)
  }
}

export function deactivate() {}
