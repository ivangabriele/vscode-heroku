import isCommand from 'is-command'
import moment from 'moment'
import { StatusBarAlignment, type StatusBarItem, window, commands } from 'vscode'

import { STATUS_BAR_ITEM, StatusBarItemState } from './constants'
import { mapHerokuApiReleaseStatusToStatusBarItemState } from './utils'
import { ACTION } from '../../constants'
import { exec } from '../../helpers/exec'
import { handleError } from '../../helpers/handleError'
import { isEmpty } from '../../helpers/isEmpty'
import { isHerokuCliAuthenticated } from '../../helpers/isHerokuCliAuthenticated'
import { shortenMomentOutput } from '../../helpers/shortenMomentOutput'
import { HerokuReleaseManager } from '../HerokuReleaseManager'

import type { HerokuRelease } from '../HerokuReleaseManager/types'

const REFRESH_DELAY: number = 2_000

class StatusBarItemManager {
  #appName: string | undefined
  #lastMessage: string | undefined
  #lastState: StatusBarItemState | undefined
  #statusBarItem: StatusBarItem

  constructor() {
    this.#statusBarItem = window.createStatusBarItem(StatusBarAlignment.Left)
  }

  async load(isFirstLoad = false): Promise<void> {
    // -------------------------------------------------------------------------
    // Is Heroku CLI available?

    if (!(await isCommand('heroku'))) {
      this.#updateItem(StatusBarItemState.NO_CLI)
      this.#statusBarItem.show()

      if (isFirstLoad) {
        const action = await window.showWarningMessage(
          "Heroku CLI doesn't seem to be installed. Please install it and reload VS Code.",
          ACTION.NO_HEROKU_CLI.label,
        )

        if (action === ACTION.NO_HEROKU_CLI.label) {
          commands.executeCommand('vscode.open', ACTION.NO_HEROKU_CLI.uri)
        }
      }

      return
    }

    // -------------------------------------------------------------------------
    // Is Heroku CLI authenticated?

    if (!(await isHerokuCliAuthenticated())) {
      this.#updateItem(StatusBarItemState.NO_AUTH)
      this.#statusBarItem.show()

      if (isFirstLoad) {
        const action = await window.showWarningMessage(
          'You are not logged in to Heroku CLI. Do you want to log in?',
          ACTION.NO_HEROKU_AUTH.label,
        )

        if (action === ACTION.NO_HEROKU_AUTH.label) {
          commands.executeCommand('extension.vscode-heroku.logInToHerokuCli')
        }
      }

      return
    }

    if (await isHerokuCliAuthenticated()) {
      await this.#updateAppName()
      if (this.#appName) {
        this.#updateItem(StatusBarItemState.SYNCING)
      } else {
        this.#updateItem(StatusBarItemState.NO_LINK)
      }
    }

    this.#statusBarItem.show()

    if (this.#appName) {
      this.#updateRelease()
    }
  }

  // @todo Handle multiple Heroku apps case.
  async #updateAppName(): Promise<void> {
    try {
      const { stdout } = await exec('git remote -v')

      const foundHerokuRepositories = stdout.match(/(https:\/\/git\.heroku\.com\/|git@heroku\.com:)([^\s.]+)/gi)
      if (!foundHerokuRepositories || foundHerokuRepositories.length === 0) {
        this.#appName = undefined

        return
      }

      const firstRepositoryUrl = foundHerokuRepositories[0]
      this.#appName = foundHerokuRepositories[0].substring(firstRepositoryUrl.startsWith('https') ? 23 : 15)
    } catch (err) {
      this.#appName = undefined

      handleError(err)
    }
  }

  #updateItem(state: StatusBarItemState, herokuRelease?: HerokuRelease): void {
    const statusBarItem = STATUS_BAR_ITEM[state]

    let messageWithIcon = `$(${statusBarItem.icon}) ${statusBarItem.message}`
    if (herokuRelease) {
      messageWithIcon += ` v${herokuRelease.version}`
    }
    if (herokuRelease) {
      messageWithIcon += ` (${shortenMomentOutput(moment(herokuRelease?.createdAt).fromNow())})`
    }

    if (state === this.#lastState && statusBarItem.message === this.#lastMessage) {
      return
    }

    const tooltip = statusBarItem.hasHerokuReleaseDescription ? statusBarItem.tooltip : herokuRelease?.description

    this.#lastMessage = statusBarItem.message
    this.#lastState = state
    this.#statusBarItem.backgroundColor = statusBarItem.backgroundColor
    this.#statusBarItem.command = statusBarItem.command
    this.#statusBarItem.color = statusBarItem.color
    this.#statusBarItem.text = messageWithIcon
    this.#statusBarItem.tooltip = tooltip
  }

  async #updateRelease() {
    try {
      if (!this.#appName) {
        return
      }

      const statement = `heroku releases -a ${this.#appName} --json -n=10`
      const { stderr, stdout } = await exec(statement)
      if (!isEmpty(stderr)) {
        this.#updateItem(StatusBarItemState.INTERNAL_ERROR)
        await window.showErrorMessage(`An error happened while running \`${statement}\`: "${stderr}".`)

        return
      }

      const herokuReleasesManager = new HerokuReleaseManager(stdout)
      if (!herokuReleasesManager.lastRelease) {
        this.#updateItem(StatusBarItemState.NO_RELEASE)
        setTimeout(() => this.#updateRelease(), REFRESH_DELAY)

        return
      }

      const state = mapHerokuApiReleaseStatusToStatusBarItemState(herokuReleasesManager.lastRelease.status)

      this.#updateItem(state, herokuReleasesManager.lastRelease)
      setTimeout(() => this.#updateRelease(), REFRESH_DELAY)
    } catch (err) {
      handleError(err)
    }
  }
}

export const statusBarItemManager = new StatusBarItemManager()
