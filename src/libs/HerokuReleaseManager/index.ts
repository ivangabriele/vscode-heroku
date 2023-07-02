import { mapHerokuApiReleaseToHerokuRelease } from './utils'
import { InternalError } from '../InternalError'

import type { HerokuRelease } from './types'
import type { HerokuApi } from '../../types'

export class HerokuReleaseManager {
  #lastRelease: HerokuRelease | undefined
  #releases: HerokuRelease[]

  get lastRelease(): HerokuRelease | undefined {
    return this.#lastRelease
  }

  constructor(stdoutJson: string) {
    this.#releases = []

    this.updateReleases(stdoutJson)
  }

  updateReleases(stdoutJson: string): void {
    try {
      const herokuApiReleases: HerokuApi.Release[] = JSON.parse(stdoutJson.trim())

      this.#releases = herokuApiReleases.map(mapHerokuApiReleaseToHerokuRelease)
    } catch (err) {
      throw new InternalError(`An error happened while parsing:\n\`${stdoutJson}\`.`, err)
    }

    this.#updateLastRelease()
  }

  #updateLastRelease(): void {
    this.#lastRelease = this.#releases.filter(({ isSlugLess }) => !isSlugLess).at(0)
  }
}
