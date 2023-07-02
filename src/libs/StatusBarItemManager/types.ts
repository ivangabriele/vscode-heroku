import { ThemeColor } from 'vscode'

export type StatusBarItemProps = {
  // https://code.visualstudio.com/api/references/theme-color
  backgroundColor?: ThemeColor
  color?: ThemeColor
  command?: string
  // https://code.visualstudio.com/api/references/icons-in-labels
  // https://octicons.github.com
  icon: string
  message: string
} & (
  | {
      hasHerokuReleaseDescription: false
      tooltip: string
    }
  | {
      hasHerokuReleaseDescription: true
      tooltip: undefined
    }
)
