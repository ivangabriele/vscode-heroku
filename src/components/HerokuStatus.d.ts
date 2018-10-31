export interface Status {
  [key: string]: StatusContent
}
interface StatusContent {
  icon: string
  message: string
  tooltip: string
}
