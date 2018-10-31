import * as vscode from 'vscode'

import HerokuStatus from './components/HerokuStatus'

export function activate(context: vscode.ExtensionContext) {
  new HerokuStatus()
}

export function deactivate() {}
