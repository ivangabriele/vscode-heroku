/* eslint-disable typescript-sort-keys/interface */
export namespace HerokuApi {
  // https://devcenter.heroku.com/articles/platform-api-reference#release
  export interface Release {
    addon_plan_names: string[]
    app: {
      // UUID
      id: string
      name: string
    }
    // ISO 8601 Date
    created_at: string
    description: string
    status: ReleaseStatus
    // UUID
    id: string
    // https://devcenter.heroku.com/articles/platform-api-reference#slug
    slug: {
      id: string
    } | null
    // ISO 8601 Date
    updated_at: string
    user: {
      email: string
      id: string
    }
    version: number
    current: boolean
    output_stream_url: string | null
  }

  // https://devcenter.heroku.com/articles/platform-api-reference#release
  export enum ReleaseStatus {
    FAILED = 'failed',
    PENDING = 'pending',
    SUCCEEDED = 'succeeded',
  }
}
/* eslint-enable typescript-sort-keys/interface */
