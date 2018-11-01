import to from 'await-to-js'
import { sync as commandExistsSync } from 'command-exists'
import * as moment from 'moment'
import { StatusBarAlignment, StatusBarItem, window, workspace } from 'vscode'

import exec from '../helpers/exec'
import shortenMomentOutput from '../helpers/shortenMomentOutput'

import { HerokuRelease, Status, StatusContent } from './HerokuStatus.d'

// Icons: https://octicons.github.com
const STATUS: Status = {
  ERROR: {
    name: 'Error',
    icon: 'alert',
    message: 'Heroku went wrong.',
    tooltip: `Sorry but something went wrong while checking Heroku status.`,
  },
  FAILED: {
    name: 'Failed',
    icon: 'alert',
    message: 'Heroku',
    tooltip: `The last Heroku deployment failed.`,
  },
  NONE: {
    name: 'None',
    icon: 'circle-slash',
    message: 'Heroku',
    tooltip: `No Heroku deployment for this project yet.`,
  },
  PENDING: {
    name: 'Pending',
    icon: 'clock',
    message: 'Heroku',
    tooltip: `Heroku deployment in progress...`,
  },
  SUCCESSFUL: {
    name: 'Successful',
    icon: 'check',
    message: 'Heroku',
    tooltip: `The last Heroku deployment succeeded.`,
  },
  SYNCING: {
    name: 'Syncing',
    icon: 'sync',
    message: 'Heroku',
    tooltip: `Fetching the current Heroku deployment status...`,
  },
  UNAVAILABLE: {
    name: 'Unavailable',
    icon: 'alert',
    message: 'Heroku CLI unavailable',
    tooltip: `The "heroku" command doesn't seem available. Did you install Heroku CLI ?`,
  },
}

const LOOP_DELAY: number = 2_500

export default class HerokuStatus {
  private cwd: string = workspace.workspaceFolders[0].uri.fsPath
  private lastMessage: string
  private lastStatus: string
  private statusBarItem: StatusBarItem = window.createStatusBarItem(StatusBarAlignment.Left)

  constructor() {
    this.start()
  }

  private async start(): Promise<void> {
    if (!await this.isWorkspaceLinkedToHeroku()) return

    this.setStatusTo(STATUS.SYNCING)
    this.statusBarItem.show()
    await this.checkHerokuDeployments()
  }

  private setStatusTo(status: StatusContent, version: number = 0, date: string = ''): void {
    let message: string = `$(${status.icon}) ${status.message}`
    if (version !== 0) message += ` v${version}`
    if (date !== '') message += ` (shortenMomentOutput(${moment(date).fromNow()}))`

    if (message === this.lastMessage && status.name === this.lastStatus) return

    this.lastMessage = message
    this.lastStatus = status.name
    this.statusBarItem.text = message
    this.statusBarItem.tooltip = status.tooltip
  }

  private async checkHerokuDeployments() {
    if (!commandExistsSync('heroku')) {
      this.setStatusTo(STATUS.UNAVAILABLE)
      setTimeout(this.checkHerokuDeployments.bind(this), LOOP_DELAY)

      return
    }

    const [err, out] = await to<string>(exec('heroku', ['releases', '-n=1', '--json'], { cwd: this.cwd }))

    if (err !== null) {
      this.setStatusTo(STATUS.ERROR)
      setTimeout(this.checkHerokuDeployments.bind(this), LOOP_DELAY)

      return
    }

    const herokuReleases = JSON.parse(out.trim()) as HerokuRelease[]

    if (herokuReleases.length === 0) {
      this.setStatusTo(STATUS.NONE)
      setTimeout(this.checkHerokuDeployments.bind(this), LOOP_DELAY)

      return
    }

    if (herokuReleases[0].status === 'pending') {
      this.setStatusTo(STATUS.PENDING, herokuReleases[0].version, herokuReleases[0].created_at)
      setTimeout(this.checkHerokuDeployments.bind(this), LOOP_DELAY)

      return
    }

    if (herokuReleases[0].status === 'succeeded') {
      this.setStatusTo(STATUS.SUCCESSFUL, herokuReleases[0].version, herokuReleases[0].created_at)
      setTimeout(this.checkHerokuDeployments.bind(this), LOOP_DELAY)

      return
    }

    this.setStatusTo(STATUS.FAILED, herokuReleases[0].version, herokuReleases[0].created_at)
    setTimeout(this.checkHerokuDeployments.bind(this), LOOP_DELAY)
  }

  private async isWorkspaceLinkedToHeroku(): Promise<boolean> {
    const [err] = await to(exec('heroku', ['info'], { cwd: this.cwd }))

    return err === null
  }
}
