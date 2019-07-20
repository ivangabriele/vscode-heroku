import { exec, ExecOptions } from 'child_process';

export default async function (
  command: string,
  args: string[] = [],
  options: ExecOptions = {},
): Promise<any> {
  return new Promise((resolve, reject) => {
    let stderr = '';
    let stdout = '';

    try {
      const batch = exec([command].concat(args).join(' '), options);

      batch.stdout.on('data', data => stdout += data.toString());
      batch.stderr.on('data', data => stderr += data.toString());

      batch.on('close', () => {
        if (stderr !== '') return reject(new Error(stderr.trim()));

        resolve(stdout);
      });
    } catch (err) {
      reject(err);
    }
  });
}
