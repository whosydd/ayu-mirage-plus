# Changelog

## 1.4.0 (2023-3-21)

- 基于 vscode defalut dark 主题，重新调整语言相关配色
- 更改 engines 为 vscode ^1.76.0

## 1.3.1 (2022-06-13)

- 移除 "descriptionForeground" 高亮颜色

## 1.3.0 (2021-10-14)

- 重新调整项目目录结构，优化代码
- 在使用`remove`命令时，剔除默认主题选项
- 为了可能会增加的新功能，更改 engines 为 1.61.0

## 1.2.4 (2021-10-14)

- 修复：移除主题时，没有选择会弹出‘移除 undefined 的提示’

## 1.2.3 (2021-09-21)

- 修改 "debugConsole.warningForeground": "#dfbb74"
- 修改部分关键字字体为"italic"
  - keyword.operator.new
  - keyword.operator.expression

## 1.2.2 (2021-09-02)

- 修改字符串相关部分高亮

  - "punctuation.definition.template-expression.begin"
  - "punctuation.definition.template-expression.end"
  - "punctuation.definition.string.template.begin"
  - "punctuation.definition.string.template.end"
  - "punctuation.definition.string.begin"
  - "punctuation.definition.string.end"

- 修改关键字部分高亮
  - "keyword.control.flow"
  - "storage.modifier.async"

## 1.2.1 (2021-07-16)

- 修改 golang 部分高亮
  - "keyword.var.go"
  - "keyword.control.go"

## 1.2.0 (2021-07-10)

- 调整配置项结构，现在需要 `name` 和 `colors` 属性
- 修复配置项中无法启动内置 color picker 的问题
- 针对`typescript`添加部分高亮
  - "support.variable.property.ts"
  - "support.variable.property.tsx"

## 1.1.3 (2021-07-06)

- 拆分代码
- 针对 `.vue` 文件修改部分高亮
  - "meta.tag.block.any.html"
  - "punctuation.separator.key-value.html"
  - "support.class.component.html"

## 1.1.2 (2021-07-04)

- fix bug

## 1.1.1 (2021-07-04)

- 更换图床

## 1.1.0 (2021-06-27)

- 使用 typescript 重构代码

## 1.0.3 (2021-06-23)

- 优化代码

## 1.0.2 (2021-06-19)

- 更新 vscode 版本支持为 1.57.0 以上

## 1.0.1 (2021-06-16)

- 为了更好的适配，更改了`statusBarItem.hoverBackground`的颜色，同时不会受高亮颜色影响
- 稍微更改了高亮颜色的默认值

## 1.0.0 (2021-06-15)

- 重新构建了代码，基本的主题颜色并无大的改动
- 现在可以根据配置自定义添加主题颜色

## 0.3.2 (2021-04-08)

- Change color

```json
"entity.other.attribute-name.id": "#e66379",
"variable.other.object.property": "#F28779"

```

## 0.3.2 (2021-04-08)

- Change color

```json
"entity.other.attribute-name.id": "#e66379",
"variable.other.object.property": "#F28779"

```

## 0.3.1 (2021-03-20)

- Fix error color

## 0.3.0 (2021-03-20)

- Unify for similar colors

## 0.2.10 (2021-02-06)

- Add "blue" and "yellow" and new settings (Now you can change the theme color you want)

```json
"editor.findMatchBorder": "#fa3344",
"editor.findMatchHighlightBorder": "#f27983ab",
```

## 0.2.9 (2021-02-04)

- deleted "blue" and "yellow"

- reset color "#a6d882" --> "\#CCFF99"

```json
// workbench
"editorSuggestWidget.selectedBackground": "#574b90",
"editor.selectionBackground": "#574b90",
"editor.selectionHighlightBackground": "#574b905d",
"statusBar.debuggingBackground": "#ffaedb",
"statusBarItem.activeBackground": "#707a8c69",
"sideBarTitle.foreground": "#707a8c",

// editor
"strings": "#CCFF99",
"numbers": "#CCFF99",
"textMateRules": [
  {
    "scope": "meta.brace.square.js",
    "settings": {
      "foreground": "#4bd484",
      "fontStyle": "italic"
    }
  },
  {
    "scope": [
      "punctuation.definition.string.begin.html",
      "punctuation.definition.string.end.html",
      "punctuation.definition.string.begin.js",
      "punctuation.definition.string.end.js"
    ],
    "settings": {
      "foreground": "#4bd484",
      "fontStyle": "italic"
    }
  },
  {
    "scope": ["meta.object-literal.key.js"],
    "settings": {
      "foreground": "#AC92E0",
      "fontStyle": "italic"
    }
  },
  {
    "scope": ["variable.other.object.property.js"],
    "settings": {
      "foreground": "#73D0FF",
      "fontStyle": ""
    }
  },
  {
    "scope": ["variable.language.this.js"],
    "settings": {
      "foreground": "#ED4C67",
      "fontStyle": "italic"
    }
  },
  {
    "scope": ["support.variable.property.js"],
    "settings": {
      "foreground": "#629ef8",
      "fontStyle": "italic"
    }
  },
  {
    "scope": [
      "keyword.operator.decrement.js",
      "keyword.operator.relational.js",
      "keyword.operator.increment.js",
      "keyword.operator.ternary.js"
    ],
    "settings": {
      "foreground": "#e77ee7",
      "fontStyle": ""
    }
  },
  {
    "scope": ["entity.other.attribute-name.id.css"],
    "settings": {
      "foreground": "#ED4C67",
      "fontStyle": "bold"
    }
  },
  {
    "scope": ["keyword.control.at-rule.extend.scss"],
    "settings": {
      "foreground": "#ED4C67",
      "fontStyle": "italic bold"
    }
  },
  {
    "scope": [
      "keyword.control.at-rule.include.scss",
      "keyword.control.at-rule.mixin.scss",
      "keyword.control.at-rule.function.scss"
    ],
    "settings": {
      "fontStyle": "italic bold"
    }
  },
  {
    "scope": [
      "keyword.control.if.scss",
      "keyword.control.else.scss",
      "keyword.control.for.scss",
      "keyword.control.while.scss",
      "keyword.control.operator"
    ],
    "settings": {
      "foreground": "#7594f8",
      "fontStyle": "italic"
    }
  },
  {
    "scope": ["keyword.control.return.scss"],
    "settings": {
      "foreground": "#7594f8",
      "fontStyle": "italic"
    }
  }
]
```

## 0.2.8 (2020-12-28)

#### Blue.json

Reset all yellow to Blue

#### Green.json

reset color "#b8e994" --> "\#a6d882"

reset all yellow to green

#### JS

{

"scope": "variable.other.property.js",

"settings": {

"foreground": "#f0a1a8",

"fontStyle": "italic"

}

},

{

"scope": "variable.other.object.property.js",

"settings": {

"foreground": "#77a8d9",

"fontStyle": "bold"

}

},

{

"scope": [

"keyword.operator.comparison.js",

"keyword.operator.assignment.js",

"keyword.operator.arithmetic.js"

],

"settings": {

"foreground": "#e283d2",

"fontStyle": ""

}

},

#### Python

{

"scope": [

"keyword.operator.assignment.python",

"keyword.operator.arithmetic.python",

"keyword.operator.comparison.python"

],

"settings": {

"foreground": "#e283d2",

"fontStyle": ""

}

},

## 0.2.7 (2020-12-26)

- change color

  "terminal.ansiBlue": "#66b0e2"
