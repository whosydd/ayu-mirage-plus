import * as fs from 'fs'
import * as vscode from 'vscode'
import settings from '../config/settings'
import { tipAlready, tipConfigFormat, tipCreateConfig, tipSetConfig } from '../config/tips'
import { ConfigParams } from '../config/types'

const { foregroundColors, themeColors, borderColors, highlightColors } = settings

export default async () => {
  // 获取设置选项
  const config: ConfigParams[] | undefined = await vscode.workspace
    .getConfiguration('ayu-mirage-plus')
    .get('resetTheme')

  try {
    // 配置项不存在抛出错误
    if (config === undefined) {
      throw new Error('配置项不存在！')
    }

    // 检测是否存在配置项
    if (config[0].name === '') {
      tipSetConfig('reset')
      return
    }

    // 判断配置项格式
    if (!config[0].colors) {
      tipConfigFormat()
      return
    }

    config.map(item => {
      const {
        name,
        colors: { themeColor, foreground, border, highlight },
      } = item
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
          tipAlready(name, 'already modified!')
        })
      } else {
        tipCreateConfig(name)
      }
    })
  } catch (error: any) {
    vscode.window.showErrorMessage(error.message)
  }
}
