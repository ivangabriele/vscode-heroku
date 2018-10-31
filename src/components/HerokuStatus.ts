import { StatusBarAlignment, StatusBarItem, window } from 'vscode'
import { sync as commandExistsSync } from 'command-exists'

// Icons: https://octicons.github.com
const STATUS = {
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

  constructor() {
    if (commandExistsSync('heroku')) {
      this.setStatusTo(STATUS.SYNCING)
    } else {
      this.setStatusTo(STATUS.UNAVAILABLE)
    }

    this.statusBarItem.show()
  }

  private setStatusTo(status) {
    this.statusBarItem.text = `$(${status.icon}) ${status.message}`
    this.statusBarItem.tooltip = status.tooltip
  }
}
