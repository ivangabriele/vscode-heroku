export interface HerokuApp {
  acm: boolean
  archived_at: string | null
  build_stack: {
    id: string
    name: string
  }
  buildpack_provided_description: string
  created_at: string
  git_url: string
  id: string
  internal_routing: null
  maintenance: boolean
  name: string
  organization: null
  owner: {
    email: string
    id: string
  }
  region: {
    id: string
    name: 'eu' | 'us'
  }
  released_at: string
  repo_size: number | null
  slug_size: number | null
  space: null
  stack: {
    id: string
    name: string
  }
  team: null
  updated_at: string
  web_url: string
}
