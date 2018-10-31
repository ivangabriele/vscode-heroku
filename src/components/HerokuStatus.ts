import { StatusBarAlignment, StatusBarItem, window } from 'vscode'

export default class HerokuStatus {
  private statusBarItem: StatusBarItem = window.createStatusBarItem(StatusBarAlignment.Left)

  constructor() {
    this.updateStatus()
  }

  private updateStatus() {
    this.statusBarItem.text = 'Heroku $(sync)'
    this.statusBarItem.show()
  }
}
