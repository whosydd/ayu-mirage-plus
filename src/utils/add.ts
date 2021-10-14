import * as fs from 'fs'
import * as vscode from 'vscode'
import settings from '../config/settings'
import { tipConfigFormat, tipSetConfig, tipAlready } from '../config/tips'
import { ConfigParams, Theme } from '../config/types'

const { foregroundColors, themeColors, borderColors, highlightColors } = settings

// 配置项格式

export default async () => {
  // 获取设置选项
  const config: ConfigParams[] | undefined = await vscode.workspace
    .getConfiguration('ayu-mirage-plus')
    .get('addTheme')

  try {
    // 配置项不存在抛出错误
    if (config === undefined) {
      throw new Error('配置项不存在！')
    }

    // 检测是否存在配置项
    if (config[0].name === '') {
      tipSetConfig('add')
      return
    }

    // 配置项格式不正确弹出提示（历史遗留问题）
    if (!config[0].colors) {
      tipConfigFormat()
      return
    }

    // 处理配置项
    const themes = config.reduce<Theme[]>((pre, item) => {
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

              tipAlready(name, 'has been created!')
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
  } catch (error: any) {
    vscode.window.showErrorMessage(error.message)
  }
}
