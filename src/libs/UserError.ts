import { window } from 'vscode'

import { InternalError } from './InternalError'

const DEFAULT_MESSAGE =
  'Something unexpected happened. Please file an issue at https://github.com/ivangabriele/vscode-heroku/issues.'

export class UserError extends InternalError {
  constructor(message: string = DEFAULT_MESSAGE, originalError?: unknown) {
    super(message, originalError)

    this.name = 'UserError'

    window.showErrorMessage(message)
  }
}
