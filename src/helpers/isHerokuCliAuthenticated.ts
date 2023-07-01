import { exec } from './exec'

export async function isHerokuCliAuthenticated(): Promise<boolean | void> {
  const { stdout } = await exec('heroku whoami')

  return stdout.includes('@')
}
