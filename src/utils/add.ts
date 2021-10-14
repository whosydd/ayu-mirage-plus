import * as fs from 'fs'
import * as vscode from 'vscode'
import settings from '../config/settings'

const { foregroundColors, themeColors, borderColors, highlightColors } = settings

export default async () => {
  // 获取设置选项
  const res:
    | [
        {
          name: string
          colors: {
            themeColor: string
            foreground: string
            border: string
            highlight: string
          }
        }
      ]
    | undefined = await vscode.workspace.getConfiguration('ayu-mirage-plus').get('addTheme')

  // 判断配置项
  if (res && res.length > 0 && res[0].name !== '') {
    // 判断配置项格式
    if (!res[0].colors) {
      vscode.window.showInformationMessage('Ayu Mirage Plus 1.2.0 new!', {
        modal: true,
        // @ts-ignore
        detail: `现在配置项需要 name 和 colors 属性，请重新配置选项！
        Now you need use "name" and "colors" in the configuration items.
        
        For details, please refer to the extension page.`,
      })
      return
    }

    const themes = res.reduce<{ label: string; uiTheme: string; path: string }[]>((pre, item) => {
      const {
        name,
        colors: { themeColor, foreground, border, highlight },
      } = item
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
                .then(value =>
                  value === 'Reload Window'
                    ? vscode.commands.executeCommand('workbench.action.reloadWindow')
                    : null
                )
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
      .then(value =>
        value === 'Open settings.json'
          ? vscode.commands.executeCommand('workbench.action.openSettingsJson')
          : null
      )
  }
}
