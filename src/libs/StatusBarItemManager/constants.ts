import { ThemeColor } from 'vscode'

import { type StatusBarItemProps } from './types'

export enum StatusBarItemState {
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  NO_AUTH = 'NO_AUTH',
  NO_CLI = 'NO_CLI',
  NO_LINK = 'NO_LINK',
  NO_RELEASE = 'NO_RELEASE',
  RELEASE_FAILED = 'RELEASE_FAILED',
  RELEASE_PENDING = 'RELEASE_PENDING',
  RELEASE_SUCCEEDED = 'RELEASE_SUCCEEDED',
  SYNCING = 'SYNCING',
}

// https://code.visualstudio.com/api/references/vscode-api#StatusBarItem
export const STATUS_BAR_ITEM: Record<StatusBarItemState, StatusBarItemProps> = {
  [StatusBarItemState.INTERNAL_ERROR]: {
    backgroundColor: new ThemeColor('statusBarItem.errorBackground'),
    color: new ThemeColor('statusBarItem.errorForeground'),
    hasHerokuReleaseDescription: false,
    icon: 'alert',
    message: 'Heroku (internal error)',
    tooltip: 'Sorry but something went wrong while checking Heroku status.',
  },

  [StatusBarItemState.NO_AUTH]: {
    backgroundColor: new ThemeColor('statusBarItem.warningBackground'),
    color: new ThemeColor('statusBarItem.warningForeground'),
    command: 'extension.vscode-heroku.logInToHerokuCli',
    hasHerokuReleaseDescription: false,
    icon: 'log-in',
    message: 'Heroku (logged out)',
    tooltip: 'Log In to Heroku CLI',
  },

  [StatusBarItemState.NO_CLI]: {
    backgroundColor: new ThemeColor('statusBarItem.errorBackground'),
    color: new ThemeColor('statusBarItem.errorForeground'),
    hasHerokuReleaseDescription: false,
    icon: 'alert',
    message: 'Heroku (no CLI)',
    tooltip: "Heroku CLI doesn't seem to be installed. Please install it and reload VS Code.",
  },

  [StatusBarItemState.NO_LINK]: {
    command: 'extension.vscode-heroku.linkWorkspaceToHerokuApp',
    hasHerokuReleaseDescription: false,
    icon: 'debug-disconnect',
    message: 'Heroku',
    tooltip: 'Link current workspace to an existing Heroku application',
  },

  [StatusBarItemState.NO_RELEASE]: {
    hasHerokuReleaseDescription: false,
    icon: 'circle-slash',
    message: 'Heroku',
    tooltip: 'No Heroku deployment for this application yet.',
  },

  [StatusBarItemState.RELEASE_FAILED]: {
    backgroundColor: new ThemeColor('statusBarItem.warningBackground'),
    color: new ThemeColor('statusBarItem.warningForeground'),
    hasHerokuReleaseDescription: true,
    icon: 'error',
    message: 'Heroku',
    tooltip: undefined,
  },

  [StatusBarItemState.RELEASE_PENDING]: {
    hasHerokuReleaseDescription: true,
    icon: 'gear-spin',
    message: 'Heroku',
    tooltip: undefined,
  },

  [StatusBarItemState.RELEASE_SUCCEEDED]: {
    hasHerokuReleaseDescription: true,
    icon: 'pass',
    message: 'Heroku',
    tooltip: undefined,
  },

  [StatusBarItemState.SYNCING]: {
    hasHerokuReleaseDescription: false,
    icon: 'sync-spin',
    message: 'Heroku',
    tooltip: 'Fetching the current Heroku deployment status...',
  },
}
