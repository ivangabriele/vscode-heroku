import { Uri } from 'vscode'

export const ACTION = {
  NO_HEROKU_AUTH: {
    label: 'Log into Heroku',
  },
  NO_HEROKU_CLI: {
    label: 'Download and install',
    uri: Uri.parse('https://devcenter.heroku.com/articles/heroku-cli#install-the-heroku-cli'),
  },
}
