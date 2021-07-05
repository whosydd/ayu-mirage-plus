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
    | undefined = await vscode.workspace.getConfiguration('ayu-mirage-plus').get('addTheme')

  // 判断是否有配置项
  if (res !== undefined && res[0].name !== '') {
    const themes = res.reduce<{ label: string; uiTheme: string; path: string }[]>((pre, item) => {
      const { name, themeColor, foreground, border, highlight } = item
      if (!fs.existsSync(`${__dirname}/themes/theme-${name}.json`)) {
        // 创建主题文件
        fs.copyFile(
          `${__dirname}/themes/theme.json`,
          `${__dirname}/themes/theme-${name}.json`,
          () =>
            fs.readFile(`${__dirname}/themes/theme-${name}.json`, 'utf-8', (err, data) => {
              if (err) {
                throw err
              }
              const theme = JSON.parse(data)
              themeColors.forEach(item => (theme.colors[item] = themeColor))
              foregroundColors.forEach(item => (theme.colors[item] = foreground))
              borderColors.forEach(item => (theme.colors[item] = border))
              highlightColors.forEach(item => (theme.colors[item] = highlight))
              theme.name = `Ayu Mirage Plus ${name}`
              fs.writeFileSync(`${__dirname}/themes/theme-${name}.json`, JSON.stringify(theme))
              vscode.window
                .showInformationMessage(
                  `The "Ayu Mirage Plus ${name}" has been created!`,
                  'Reload Window'
                )
                .then(() => {
                  vscode.commands.executeCommand('workbench.action.reloadWindow')
                })
            })
        )
      } else {
        vscode.window.showWarningMessage(`The "Ayu Mirage Plus ${name}" already exists！`)
      }
      return [
        ...pre,
        {
          label: `Ayu Mirage Plus ${name}`,
          uiTheme: 'vs-dark',
          path: `dist/themes/theme-${name}.json`,
        },
      ]
    }, [])

    // 注入package.json
    fs.readFile(`${__dirname}/../package.json`, 'utf-8', (err, data) => {
      if (err) {
        throw err
      }
      const packageFile = JSON.parse(data)
      themes.forEach(item => {
        if (
          !packageFile.contributes.themes.find((i: { label: string }) => i.label === item.label)
        ) {
          packageFile.contributes.themes.push(item)
        }
      })
      fs.writeFileSync(`${__dirname}/../package.json`, JSON.stringify(packageFile))
    })
  } else {
    vscode.window
      .showWarningMessage(
        'Please set "ayu-mirage-plus.addTheme" in settings.json first!',
        'Open settings.json'
      )
      .then(() => vscode.commands.executeCommand('workbench.action.openSettingsJson'))
  }
}
