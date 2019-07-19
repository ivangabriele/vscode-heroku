import * as vscode from 'vscode'

import HerokuStatus from './components/HerokuStatus'
import linkWorkspace from './lib/linkWorkspace'

export function activate(context: vscode.ExtensionContext) {
  // Skip extension start if we can't detect a workspace:
  if (vscode.workspace.workspaceFolders === undefined) return;

  new HerokuStatus()

  const linkWorkspaceDisposable = vscode.commands.registerCommand(
    'extension.vscode-heroku.linkWorkspace', () => linkWorkspace())

  context.subscriptions.push(
    linkWorkspaceDisposable,
  )
}

export function deactivate() {}
