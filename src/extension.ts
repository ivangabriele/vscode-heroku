import isCommand from 'is-command'
import { commands, ExtensionContext, window, workspace } from 'vscode'

import { linkWorkspaceToHerokuApp } from './commands/linkWorkspaceToHerokuApp'
import { logIntoHeroku } from './commands/logIntoHeroku'
import { ACTION } from './constants'
import { handleError } from './helpers/handleError'
import { isHerokuCliAuthenticated } from './helpers/isHerokuCliAuthenticated'
import { HerokuStatus } from './libs/HerokuStatus'

export async function activate(context: ExtensionContext) {
  try {
    // -------------------------------------------------------------------------
    // Are we in a workspace?

    if (!workspace.workspaceFolders || workspace.workspaceFolders.length === 0) {
      return
    }

    // -------------------------------------------------------------------------
    // Is Heroku CLI available?

    if (!(await isCommand('heroku'))) {
      const action = await window.showWarningMessage(
        "Heroku CLI doesn't seem to be installed. Please install it and reload VS Code.",
        ACTION.NO_HEROKU_CLI.label,
      )

      if (action === ACTION.NO_HEROKU_CLI.label) {
        commands.executeCommand('vscode.open', ACTION.NO_HEROKU_CLI.uri)
      }

      return
    }

    // -------------------------------------------------------------------------
    // Is Heroku CLI authenticated?

    if (!(await isHerokuCliAuthenticated())) {
      const action = await window.showWarningMessage(
        "Heroku CLI doesn't seem to be authenticated. Do you want to log in?",
        ACTION.NO_HEROKU_AUTH.label,
      )

      if (action === ACTION.NO_HEROKU_AUTH.label) {
        await logIntoHeroku()

        if (!(await isHerokuCliAuthenticated())) {
          return
        }
      }

      return
    }

    // -------------------------------------------------------------------------
    // Launch Heroku Status Bar

    const herokuStatus = new HerokuStatus()

    herokuStatus.start()

    // -------------------------------------------------------------------------
    // Register Heroku commands

    const linkWorkspaceToHerokuAppDisposable = commands.registerCommand(
      'extension.vscode-heroku.linkWorkspaceToHerokuApp',
      linkWorkspaceToHerokuApp,
    )
    const logIntoHerokuDisposable = commands.registerCommand('extension.vscode-heroku.logIntoHeroku', logIntoHeroku)

    context.subscriptions.push(linkWorkspaceToHerokuAppDisposable)
    context.subscriptions.push(logIntoHerokuDisposable)
  } catch (err) {
    handleError(err)
  }
}

export function deactivate() {}
