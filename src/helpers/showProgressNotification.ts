import { ProgressLocation, window } from 'vscode'

export async function showProgressNotification<T>(message: string, callback: () => Promise<T>): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    try {
      window.withProgress({ location: ProgressLocation.Notification, title: message }, async () => {
        const res = await callback()

        resolve(res)
      })
    } catch (err) {
      reject(err)
    }
  })
}
