export interface Status {
  [key: string]: StatusContent
}
export interface StatusContent {
  icon: string
  message: string
  name: string
  tooltip: string
}

export interface HerokuRelease {
  addon_plan_names: string[]
  app: {
    id: string
    name: string
  }
  created_at: string
  current: boolean
  description: string
  id: string
  output_stream_url: string | null
  slug: {
    id: string
  }
  status: 'failed' | 'pending' | 'succeeded'
  updated_at: string
  user: {
    email: string
    id: string
  }
  version: number
}
