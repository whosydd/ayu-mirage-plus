import * as fs from 'fs'
import * as path from 'path'
import * as vscode from 'vscode'
import { tipNothing, tipRemove } from '../config/tips'
import { Theme } from '../config/types'

export default async () => {
  fs.readFile(`${__dirname}/../package.json`, 'utf-8', async (err, data) => {
    if (err) {
      throw err
    }

    // 获取package.json中的主题配置
    const packageFile = JSON.parse(data)
    let themes: Theme[] = packageFile.contributes.themes

    // 去除默认主题
    const rmThemeList = themes.filter(item => item.label !== 'Ayu Mirage Plus')

    if (rmThemeList.length === 0) {
      tipNothing()
      return
    }

    // 选择需要删除的主题列表
    const rmList = await vscode.window.showQuickPick(rmThemeList, {
      canPickMany: true,
    })

    if (rmList !== undefined) {
      // 删除主题文件
      rmList.forEach(item => {
        const fileName = [
          ...__dirname.split(path.sep),
          ...item.path.split('dist/')[1].split(path.sep),
        ].join('/')
        if (fs.existsSync(fileName)) {
          fs.rmSync(fileName)
        }
      })

      // 移除package.json中的主题
      const res = themes.filter(item => !rmList?.includes(item))
      packageFile.contributes.themes = res
      fs.writeFileSync(`${__dirname}/../package.json`, JSON.stringify(packageFile))

      tipRemove(rmList)
    }
  })
}
