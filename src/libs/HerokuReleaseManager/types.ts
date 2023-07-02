import type { HerokuApi } from '../../types'

export interface HerokuRelease {
  readonly apiData: HerokuApi.Release
  readonly createdAt: Date
  readonly description: string
  readonly isCurrent: boolean
  readonly isSlugLess: boolean
  readonly status: HerokuApi.ReleaseStatus
  readonly updatedAt: Date
  readonly version: number
}
