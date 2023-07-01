import isCommand from 'is-command'
import { commands, ExtensionContext, window, workspace } from 'vscode'

import { linkWorkspaceToHerokuApp } from './commands/linkWorkspaceToHerokuApp'
import { logInToHerokuCli } from './commands/logInToHerokuCli'
import { logOutOfHerokuCli } from './commands/logOutOfHerokuCli'
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
        'You are not logged in to Heroku CLI. Do you want to log in?',
        ACTION.NO_HEROKU_AUTH.label,
      )

      if (action === ACTION.NO_HEROKU_AUTH.label) {
        await logInToHerokuCli()

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
  } catch (err) {
    handleError(err)
  }
}

export function deactivate() {}
