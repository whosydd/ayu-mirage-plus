export interface ConfigParams {
  name: string
  colors: {
    themeColor: string
    foreground: string
    border: string
    highlight: string
  }
}

export interface Theme {
  label: string
  uiTheme: string
  path: string
}
