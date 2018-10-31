export interface Status {
  [key: string]: StatusContent
}
export interface StatusContent {
  icon: string
  message: string
  tooltip: string
}
