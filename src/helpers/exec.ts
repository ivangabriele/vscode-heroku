import { execa, type ExecaReturnValue, type Options } from 'execa'
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
  const firstWorkspaceFolder = workspace.workspaceFolders?.at(0)
  if (!firstWorkspaceFolder) {
    throw new InternalError('`firstWorkspaceFolder` is undefined.')
  }

  const controlledOptions = {
    ...DEFAULT_OPTIONS,
    cwd: firstWorkspaceFolder.uri.fsPath,
    ...options,
  }
  const { shouldThrowOnStderr, ...execaOptions } = controlledOptions

  const [command, ...args] = statement.split(' ')
  if (!command) {
    throw new InternalError('`command` is undefined.')
  }

  const execaChildProcess = await execa(command, args, execaOptions)

  if (shouldThrowOnStderr && execaChildProcess.stderr.length > 0) {
    throw new InternalError(`Command \`${statement}\` failed.`, execaChildProcess.stderr)
  }

  return execaChildProcess
}
