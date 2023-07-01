import moment from 'moment'
import { StatusBarAlignment, StatusBarItem, window, workspace } from 'vscode'

import { HEROKU_STATUS } from './constants'
import { HerokuRelease, StatusContent } from './types'
import { exec } from '../../helpers/exec'
import { handleError } from '../../helpers/handleError'
import { shortenMomentOutput } from '../../helpers/shortenMomentOutput'
import { InternalError } from '../InternalError'

const LOOP_DELAY: number = 1_000
const RETRY_DELAY: number = 10_000

export class HerokuStatus {
  private cwd: string
  private herokuAppName: string | undefined
  private lastMessage: string | undefined
  private lastStatus: string | undefined
  private statusBarItem: StatusBarItem

  constructor() {
    if (!workspace.workspaceFolders) {
      throw new InternalError('`workspace.workspaceFolders` is undefined.')
    }

    this.cwd = workspace.workspaceFolders[0].uri.fsPath
    this.statusBarItem = window.createStatusBarItem(StatusBarAlignment.Left)
  }

  async start(): Promise<void> {
    if (!(await this.isWorkspaceLinkedToHeroku())) {
      setTimeout(this.start.bind(this), RETRY_DELAY)

      return
    }

    this.setStatusTo(HEROKU_STATUS.SYNCING)
    this.statusBarItem.show()
    await this.checkHerokuDeployments()
  }

  private setStatusTo(status: StatusContent, version: number = 0, date: string = ''): void {
    let message: string = `$(${status.icon})  ${status.message}`
    if (version !== 0) {
      message += ` v${version}`
    }
    if (date !== '') {
      message += ` (${shortenMomentOutput(moment(date).fromNow())})`
    }

    if (message === this.lastMessage && status.name === this.lastStatus) {
      return
    }

    this.lastMessage = message
    this.lastStatus = status.name
    this.statusBarItem.text = message
    this.statusBarItem.tooltip = status.tooltip
  }

  private async checkHerokuDeployments() {
    try {
      if (!this.herokuAppName) {
        return
      }

      const { stdout } = await exec(`heroku releases -a --json -n=1 ${this.herokuAppName}`)

      // if (err !== null) {
      //   this.setStatusTo(HEROKU_STATUS.ERROR)
      //   await window.showErrorMessage(
      //     `An error happened while running "heroku releases -n=1 --json -a ${this.herokuAppName}": ` +
      //       `${err.message} You should fix this error and reload VS Code.`,
      //   )

      //   return
      // }

      const herokuReleases = JSON.parse(stdout.trim()) as HerokuRelease[]

      if (herokuReleases.length === 0) {
        this.setStatusTo(HEROKU_STATUS.NONE)
        setTimeout(this.checkHerokuDeployments.bind(this), LOOP_DELAY)

        return
      }

      // if (herokuReleases[0].status === 'pending') {
      //   this.setStatusTo(HEROKU_STATUS.PENDING, herokuReleases[0].version, herokuReleases[0].created_at)
      //   setTimeout(this.checkHerokuDeployments.bind(this), LOOP_DELAY)

      //   return
      // }

      if (herokuReleases[0].status === 'succeeded') {
        this.setStatusTo(HEROKU_STATUS.SUCCESSFUL, herokuReleases[0].version, herokuReleases[0].created_at)
        setTimeout(this.checkHerokuDeployments.bind(this), LOOP_DELAY)

        return
      }

      this.setStatusTo(HEROKU_STATUS.FAILED, herokuReleases[0].version, herokuReleases[0].created_at)
      setTimeout(this.checkHerokuDeployments.bind(this), LOOP_DELAY)
    } catch (err) {
      handleError(err)
    }
  }

  /**
   * @todo Show a warning when using SSH instead fo HTTPS.
   * @todo Handle multiple Heroku apps case.
   */
  private async isWorkspaceLinkedToHeroku(): Promise<boolean> {
    try {
      const { stdout } = await exec('git remote -v')

      const foundHerokuRepositories = stdout.match(/(https:\/\/git\.heroku\.com\/|git@heroku\.com:)([^\s.]+)/gi)
      if (!foundHerokuRepositories) {
        return false
      }

      const firstRepositoryUrl = foundHerokuRepositories[0]
      this.herokuAppName = foundHerokuRepositories[0].substring(firstRepositoryUrl.startsWith('https') ? 23 : 15)

      return true
    } catch (err) {
      return false
    }
  }
}
