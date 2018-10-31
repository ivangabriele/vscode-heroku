export interface Status {
  [key: string]: StatusContent
}
export interface StatusContent {
  icon: string
  message: string
  tooltip: string
}

export interface HerokuRelease {
  addon_plan_names: string[]
  app: {
    id: string
    name: string
  }
  created_at: string
  description: string
  status: 'failed' | 'pending' | 'succeeded'
  id: string
  slug: {
    id: string
  }
  updated_at: string
  user: {
    email: string
    id: string
  }
  version: number
  current: boolean
  output_stream_url: string | null
}
