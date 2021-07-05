import * as fs from 'fs'
import * as path from 'path'
import * as vscode from 'vscode'
import settings from './config/settings'

const { foregroundColors, themeColors, borderColors, highlightColors } = settings

export default async () => {
  // 获取设置选项
  const res:
    | [
        {
          name: string
          themeColor: string
          foreground: string
          border: string
          highlight: string
        }
      ]
    | undefined = await vscode.workspace.getConfiguration('ayu-mirage-plus').get('resetTheme')
  // 判断是否有配置项
  if (res !== undefined && res[0].name !== '') {
    res.map(item => {
      const { name, themeColor, foreground, border, highlight } = item
      if (fs.existsSync(`${__dirname}/themes/theme-${name}.json`)) {
        fs.readFile(`${__dirname}/themes/theme-${name}.json`, 'utf-8', (err, data) => {
          if (err) {
            throw err
          }
          const theme = JSON.parse(data)
          themeColors.forEach(item => (theme.colors[item] = themeColor))
          foregroundColors.forEach(item => (theme.colors[item] = foreground))
          borderColors.forEach(item => (theme.colors[item] = border))
          highlightColors.forEach(item => (theme.colors[item] = highlight))
          fs.writeFileSync(`${__dirname}/themes/theme-${name}.json`, JSON.stringify(theme))
          vscode.window
            .showInformationMessage(
              `The "Ayu Mirage Plus ${name}" already modified!`,
              'Reload Window'
            )
            .then(() => {
              vscode.commands.executeCommand('workbench.action.reloadWindow')
            })
        })
      } else {
        vscode.window
          .showWarningMessage(
            `The "Ayu Mirage Plus ${name}" has not been created yet!`,
            'Open settings.json'
          )
          .then(() => vscode.commands.executeCommand('workbench.action.openSettingsJson'))
      }
    })
  } else {
    vscode.window
      .showWarningMessage(
        'Please set "ayu-mirage-plus.resetTheme" in settings.json first!',
        'Open settings.json'
      )
      .then(() => vscode.commands.executeCommand('workbench.action.openSettingsJson'))
  }
}
