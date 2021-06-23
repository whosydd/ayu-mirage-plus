const vscode = require('vscode')
const fs = require('fs')
const {
  foregroundColors,
  themeColors,
  borderColors,
  highlightColors,
} = require('./src/config/settings.js')

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // 生成主题
  let addTheme = vscode.commands.registerCommand('addTheme', async function () {
    // 获取设置选项
    const res = await vscode.workspace.getConfiguration('ayu-mirage-plus').get('addTheme')
    // 判断是否有配置项
    if (res[0].name !== '') {
      const themes = res.reduce((pre, item) => {
        const { name, themeColor, foreground, border, highlight } = item
        if (!fs.existsSync(`${__dirname}/src/themes/theme-${name}.json`)) {
          // 创建主题文件
          fs.copyFile(
            `${__dirname}/src/themes/theme.json`,
            `${__dirname}/src/themes/theme-${name}.json`,
            () =>
              fs.readFile(`${__dirname}/src/themes/theme-${name}.json`, 'utf-8', (err, data) => {
                if (err) throw err
                const theme = JSON.parse(data)
                themeColors.forEach(item => (theme.colors[item] = themeColor))
                foregroundColors.forEach(item => (theme.colors[item] = foreground))
                borderColors.forEach(item => (theme.colors[item] = border))
                highlightColors.forEach(item => (theme.colors[item] = highlight))
                theme.name = `Ayu Mirage Plus ${name}`
                fs.writeFileSync(
                  `${__dirname}/src/themes/theme-${name}.json`,
                  JSON.stringify(theme)
                )
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
            path: `src/themes/theme-${name}.json`,
          },
        ]
      }, [])
      // 注入package.json
      fs.readFile(`${__dirname}/package.json`, 'utf-8', (err, data) => {
        if (err) throw err
        const packageFile = JSON.parse(data)
        themes.forEach(item => {
          if (!packageFile.contributes.themes.find(i => i.label === item.label)) {
            packageFile.contributes.themes.push(item)
          }
        })
        fs.writeFileSync(`${__dirname}/package.json`, JSON.stringify(packageFile))
      })
    } else {
      vscode.window
        .showWarningMessage(
          'Please set "ayu-mirage-plus.addTheme" in settings.json first!',
          'Open settings.json'
        )
        .then(() => vscode.commands.executeCommand('workbench.action.openSettingsJson'))
    }
  })

  // 重新设置主题
  let resetTheme = vscode.commands.registerCommand('resetTheme', async function () {
    // 获取设置选项
    const res = await vscode.workspace.getConfiguration('ayu-mirage-plus').get('resetTheme')
    // 判断是否有配置项
    if (res[0].name !== '') {
      res.map(item => {
        const { name, themeColor, foreground, border, highlight } = item
        if (fs.existsSync(`${__dirname}/src/themes/theme-${name}.json`)) {
          fs.readFile(`${__dirname}/src/themes/theme-${name}.json`, 'utf-8', (err, data) => {
            if (err) throw err
            const theme = JSON.parse(data)
            themeColors.forEach(item => (theme.colors[item] = themeColor))
            foregroundColors.forEach(item => (theme.colors[item] = foreground))
            borderColors.forEach(item => (theme.colors[item] = border))
            highlightColors.forEach(item => (theme.colors[item] = highlight))
            fs.writeFileSync(`${__dirname}/src/themes/theme-${name}.json`, JSON.stringify(theme))
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
  })

  // 删除主题
  let delTheme = vscode.commands.registerCommand('delTheme', function () {
    // 移除package.json中的theme
    fs.readFile(`${__dirname}/package.json`, 'utf-8', async (err, data) => {
      if (err) throw err
      const packageFile = JSON.parse(data)
      let themes = packageFile.contributes.themes
      const rmList = await vscode.window.showQuickPick(themes, { canPickMany: true })
      const rmThemeList = rmList.filter(item => themes.includes(item))
      // 删除主题文件
      rmThemeList.forEach(item => {
        if (fs.existsSync(__dirname + '/' + item.path)) {
          fs.rmSync(__dirname + '/' + item.path)
        }
      })
      // 移除package.json中的主题
      const res = themes.filter(item => !rmThemeList.includes(item))
      packageFile.contributes.themes = res
      fs.writeFileSync(`${__dirname}/package.json`, JSON.stringify(packageFile))
      vscode.window
        .showInformationMessage(
          `${rmThemeList.map(item => item.label).toString()} has been removed!`,
          'Reload Window'
        )
        .then(() => vscode.commands.executeCommand('workbench.action.reloadWindow'))
    })
  })

  context.subscriptions.push(addTheme, resetTheme, delTheme)
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
}
