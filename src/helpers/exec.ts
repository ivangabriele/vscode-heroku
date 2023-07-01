import { execa, ExecaReturnValue, Options } from 'execa'
import { workspace } from 'vscode'

import { InternalError } from '../libs/InternalError'

export interface ExecOptions extends Options {
  shouldThrowOnStderr?: boolean
}

const DEFAULT_OPTIONS: ExecOptions = {
  reject: false,
  shouldThrowOnStderr: false,
}

export async function exec(statement: string, options: ExecOptions = {}): Promise<ExecaReturnValue<string>> {
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
  const { shouldThrowOnStderr, ...execaOptions } = controlledOptions

  const [command, ...args] = statement.split(' ')
  const execaChildProcess = await execa(command, args, execaOptions)

  if (shouldThrowOnStderr && execaChildProcess.stderr.length > 0) {
    throw new InternalError(`Command \`${statement}\` failed.`, execaChildProcess.stderr)
  }

  return execaChildProcess
}
