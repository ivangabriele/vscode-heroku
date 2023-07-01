import { Status } from './types'

// Icons: https://octicons.github.com
export const HEROKU_STATUS: Status = {
  ERROR: {
    icon: 'alert',
    message: 'Heroku went wrong.',
    name: 'Error',
    tooltip: 'Sorry but something went wrong while checking Heroku status.',
  },
  FAILED: {
    icon: 'alert',
    message: 'Heroku',
    name: 'Failed',
    tooltip: 'The last Heroku deployment failed.',
  },
  NONE: {
    icon: 'circle-slash',
    message: 'Heroku',
    name: 'None',
    tooltip: 'No Heroku deployment for this project yet.',
  },
  PENDING: {
    icon: 'clock',
    message: 'Heroku',
    name: 'Pending',
    tooltip: 'Heroku deployment in progress...',
  },
  SUCCESSFUL: {
    icon: 'check',
    message: 'Heroku',
    name: 'Successful',
    tooltip: 'The last Heroku deployment succeeded.',
  },
  SYNCING: {
    icon: 'sync',
    message: 'Heroku',
    name: 'Syncing',
    tooltip: 'Fetching the current Heroku deployment status...',
  },
  UNAVAILABLE: {
    icon: 'alert',
    message: 'Heroku CLI unavailable',
    name: 'Unavailable',
    tooltip: `The "heroku" command doesn't seem available. Did you install Heroku CLI ?`,
  },
}
