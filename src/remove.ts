// 移除package.json中的theme
import * as fs from 'fs'
import * as path from 'path'
import * as vscode from 'vscode'

export default async () => {
  fs.readFile(`${__dirname}/../package.json`, 'utf-8', async (err, data) => {
    if (err) {
      throw err
    }
    const packageFile = JSON.parse(data)
    let themes: { label: string; uiTheme: string; path: string }[] = packageFile.contributes.themes
    const rmList = await vscode.window.showQuickPick(themes, {
      canPickMany: true,
    })
    const rmThemeList = rmList?.filter(item => themes.includes(item))

    // 删除主题文件
    rmThemeList?.forEach(item => {
      const fileName = [
        ...__dirname.split(path.sep),
        ...item.path.split('dist/')[1].split(path.sep),
      ].join('/')
      if (fs.existsSync(fileName)) {
        fs.rmSync(fileName)
      }
    })

    // 移除package.json中的主题
    const res = themes.filter(item => !rmThemeList?.includes(item))
    packageFile.contributes.themes = res
    fs.writeFileSync(`${__dirname}/../package.json`, JSON.stringify(packageFile))
    vscode.window
      .showInformationMessage(
        `${rmThemeList?.map(item => item.label).toString()} has been removed!`,
        'Reload Window'
      )
      .then(() => vscode.commands.executeCommand('workbench.action.reloadWindow'))
  })
}
