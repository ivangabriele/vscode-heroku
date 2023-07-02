import type { HerokuRelease } from './types'
import type { HerokuApi } from '../../types'

export function mapHerokuApiReleaseToHerokuRelease(herokuApiRelease: HerokuApi.Release): HerokuRelease {
  return Object.freeze({
    apiData: Object.freeze(herokuApiRelease),
    createdAt: new Date(herokuApiRelease.created_at),
    description: herokuApiRelease.description,
    isCurrent: herokuApiRelease.current,
    // eslint-disable-next-line no-null/no-null
    isSlugLess: herokuApiRelease.slug === null,
    status: herokuApiRelease.status,
    updatedAt: new Date(herokuApiRelease.updated_at),
    version: herokuApiRelease.version,
  })
}
