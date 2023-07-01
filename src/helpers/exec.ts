import { $, ExecaReturnValue, Options } from 'execa'
import { workspace } from 'vscode'

import { InternalError } from '../libs/InternalError'

const DEFAULT_OPTIONS: Options = {
  reject: false,
}

export async function exec(statement: string, options: Options = {}): Promise<ExecaReturnValue<string>> {
  if (!workspace.workspaceFolders) {
    throw new InternalError('`workspace.workspaceFolders` is undefined.')
  }
  if (workspace.workspaceFolders.length === 0) {
    throw new InternalError('`workspace.workspaceFolders` is empty.')
  }

  const controlledOptions = {
    ...DEFAULT_OPTIONS,
    cwd: workspace.workspaceFolders[0].uri.fsPath,
    ...options,
  }

  return $(controlledOptions)`${statement}`
}
