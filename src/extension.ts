import * as vscode from 'vscode'
import add from './utils/add'
import remove from './utils/remove'
import reset from './utils/reset'

export function activate(context: vscode.ExtensionContext) {
  // 生成主题
  let addTheme = vscode.commands.registerCommand('addTheme', add)

  // 重新设置主题
  let resetTheme = vscode.commands.registerCommand('resetTheme', reset)

  // 删除主题
  let delTheme = vscode.commands.registerCommand('delTheme', remove)

  context.subscriptions.push(addTheme, resetTheme, delTheme)
}

// this method is called when your extension is deactivated
export function deactivate() {}
