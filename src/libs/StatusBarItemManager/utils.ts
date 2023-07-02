import { StatusBarItemState } from './constants'
import { HerokuApi } from '../../types'
import { InternalError } from '../InternalError'

export function mapHerokuApiReleaseStatusToStatusBarItemState(status: HerokuApi.ReleaseStatus): StatusBarItemState {
  switch (status) {
    case HerokuApi.ReleaseStatus.FAILED:
      return StatusBarItemState.RELEASE_FAILED

    case HerokuApi.ReleaseStatus.PENDING:
      return StatusBarItemState.RELEASE_PENDING

    case HerokuApi.ReleaseStatus.SUCCEEDED:
      return StatusBarItemState.RELEASE_SUCCEEDED

    default:
      throw new InternalError(`Unknown \`status\`: "${status}".`)
  }
}
