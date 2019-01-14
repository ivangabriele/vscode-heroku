import { exec, ExecOptions } from 'child_process'

export default async function (
  command: string,
  args: string[] = [],
  options: ExecOptions = {},
): Promise<any> {
  return new Promise((resolve, reject) => {
    let res, stderr = '', stdout = ''

    try {
      const batch = exec([command].concat(args).join(' '), options)

      batch.stdout.on('data', data => stdout += data.toString())
      batch.stderr.on('data', data => stderr += data.toString())

      batch.on('close', function () {
        if (stderr !== '') return reject(stderr.trim())

        resolve(stdout)
      })
    }
    catch (err) {
      reject(err)
    }
  })
}
