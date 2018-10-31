import to from 'await-to-js'
import { sync as commandExistsSync } from 'command-exists'
import { StatusBarAlignment, StatusBarItem, window, workspace } from 'vscode'

import exec from '../helpers/exec'

import { Status, StatusContent } from './HerokuStatus.d'

// Icons: https://octicons.github.com
const STATUS: Status = {
  FAILED: {
    icon: 'circle-slash',
    message: 'Heroku',
    tooltip: `The last Heroku deployment failed.`,
  },
  IN_PROGRESS: {
    icon: 'clock',
    message: 'Heroku',
    tooltip: `Heroku deployment in progress...`,
  },
  SUCCESSFUL: {
    icon: 'check',
    message: 'Heroku',
    tooltip: `The last Heroku deployment succeeded.`,
  },
  SYNCING: {
    icon: 'sync',
    message: 'Heroku',
    tooltip: `Fetching the current Heroku deployment status...`,
  },
  UNAVAILABLE: {
    icon: 'alert',
    message: 'Heroku CLI unavailable',
    tooltip: `The "heroku" command doesn't seem available. Did you install Heroku CLI ?`,
  },
}

export default class HerokuStatus {
  private statusBarItem: StatusBarItem = window.createStatusBarItem(StatusBarAlignment.Left)
  private workspaceDirectoryPath: string = workspace.workspaceFolders[0].uri.fsPath

  constructor() {
    if (!commandExistsSync('heroku')) {
      this.setStatusTo(STATUS.UNAVAILABLE)
      this.statusBarItem.show()

      return
    }

    this.start()
  }

  private async start(): Promise<void> {
    if (await this.isWorkspaceLinkedToHeroku()) {
      this.setStatusTo(STATUS.SYNCING)
      this.statusBarItem.show()
    }
  }

  private setStatusTo(status: StatusContent): void {
    this.statusBarItem.text = `$(${status.icon}) ${status.message}`
    this.statusBarItem.tooltip = status.tooltip
  }

  private async isWorkspaceLinkedToHeroku(): Promise<boolean> {
    const [err] = await to(exec('heroku', ['info'], { cwd: this.workspaceDirectoryPath }))

    return err === null
  }
}
