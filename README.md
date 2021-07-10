# Ayu Mirage Plus

**This theme is basic on Ayu Mirage, just for fun! :)**

[![Open in Visual Studio Code](https://open.vscode.dev/badges/open-in-vscode.svg)](https://open.vscode.dev/whosydd/ayu-mirage-plus)

## Default

![](https://raw.githubusercontent.com/whosydd/images-in-one/main/20210704000712.PNG)

## Custom

### Add

1. 在`settings.json`中配置`ayu-mirage-plus.addTheme`，可以配置多个

```json
"ayu-mirage-plus.addTheme": [
    {
      "name": "red",
      "colors":{
        "themeColor": "#f00",
        "foreground": "#000000",
        "border": "#f00",
        "highlight": "#f00"
      }
    },
    {
      "name": "yellow",
      "colors":{
        "themeColor": "#ff0",
        "foreground": "#000000",
        "border": "#ff0",
        "highlight": "#ff0"
      }
    }
  ]
```

2. 使用`ayu-mirage-plus:add theme`添加主题

![add](https://raw.githubusercontent.com/whosydd/images-in-one/main/20210704000705.PNG)

### Modify

1. 在`settings.json`中配置`ayu-mirage-plus.resetTheme`，可以配置多个

```json
"ayu-mirage-plus.resetTheme": [
    {
      "name": "red",
      "colors":{
        "themeColor": "#f00",
        "foreground": "#000000",
        "border": "#f00",
        "highlight": "#f00"
      }
    },
    {
      "name": "yellow",
      "colors":{
        "themeColor": "#ff0",
        "foreground": "#000000",
        "border": "#ff0",
        "highlight": "#ff0"
      }
    }
  ]
```

2. 使用`ayu-mirage-plus:reset theme`修改主题

![add](https://raw.githubusercontent.com/whosydd/images-in-one/main/20210704000705.PNG)

### Remove

使用`ayu-mirage-plus:remove theme`删除主题

![remove](https://raw.githubusercontent.com/whosydd/images-in-one/main/20210704000717.gif)

## Issues

由于该插件是针对源文件进行修改，所以每次添加主题以及删除主题接着重载窗口后，需要额外等待以下提示，重载窗口后即可使用配置的主题，说白了就是多重载几遍窗口，目前我还没找到解决方法。。。

When you push the button to reloading the window after add or remove theme, you need waiting for the following prompt, after reloading the window, you can use the configured theme. To put it bluntly, it means to reload the window several times. I haven't found a solution yet. . .

![](https://raw.githubusercontent.com/whosydd/images-in-one/main/20210704000716.PNG)

> 如果遇到其他问题，欢迎提交 issue
>
> If you find other problems, please submit an issue
