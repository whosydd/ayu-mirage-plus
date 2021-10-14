import * as vscode from 'vscode'
import { Theme } from './types'

export const tipSetConfig = (config: string) => {
  vscode.window
    .showWarningMessage(
      `Please set "ayu-mirage-plus.${config}Theme" in settings.json first!`,
      'Open settings.json'
    )
    .then(value =>
      value === 'Open settings.json'
        ? vscode.commands.executeCommand('workbench.action.openSettingsJson')
        : null
    )
}

export const tipConfigFormat = () => {
  vscode.window.showInformationMessage('Ayu Mirage Plus 1.2.0 new!', {
    modal: true,
    detail: `现在配置项需要 name 和 colors 属性，请重新配置选项！
        Now you need use "name" and "colors" in the configuration items.
        
        For details, please refer to the extension page.`,
  })
}

export const tipAlready = (name: string, config: string) => {
  vscode.window
    .showInformationMessage(`The "Ayu Mirage Plus ${name}" ${config}`, 'Reload Window')
    .then(value =>
      value === 'Reload Window'
        ? vscode.commands.executeCommand('workbench.action.reloadWindow')
        : null
    )
}

export const tipCreateConfig = (name: string) => {
  vscode.window
    .showWarningMessage(
      `The "Ayu Mirage Plus ${name}" has not been created yet!`,
      'Open settings.json'
    )
    .then(value =>
      value === 'Open settings.json'
        ? vscode.commands.executeCommand('workbench.action.openSettingsJson')
        : null
    )
}

export const tipRemove = (rmList: Theme[]) => {
  vscode.window
    .showInformationMessage(
      `${rmList?.map(item => item.label).toString()} has been removed!`,
      'Reload Window'
    )
    .then(value =>
      value === 'Reload Window'
        ? vscode.commands.executeCommand('workbench.action.reloadWindow')
        : null
    )
}

export const tipNothing = () => {
  vscode.window.showWarningMessage('Nothing to remove!')
}
