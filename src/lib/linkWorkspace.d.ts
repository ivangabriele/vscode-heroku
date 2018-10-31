export interface HerokuApp {
  acm: boolean
  archived_at: string | null
  buildpack_provided_description: string
  build_stack: {
    id: string
    name: string
  }
  created_at: string
  id: string
  git_url: string
  maintenance: boolean
  name: string
  owner: {
    email: string
    id: string
  }
  region: {
    id: string
    name: 'eu' | 'us'
  }
  organization: null
  team: null
  space: null
  internal_routing: null,
  released_at: string
  repo_size: number | null
  slug_size: number | null
  stack: {
    id: string
    name: string
  },
  updated_at: string
  web_url: string
}
