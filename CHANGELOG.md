
# Changelog

<br>

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

<br>

<br>

## 0.2.8 (2020-12-28)

<br>

#### Blue.json

Reset all yellow to Blue

<br>

#### Green.json

reset color "#b8e994" --> "\#a6d882"

reset all yellow to green

<br>

#### JS

​		{

​          "scope": "variable.other.property.js",

​          "settings": {

​            "foreground": "#f0a1a8",

​            "fontStyle": "italic"

​          }

​        },

​        {

​          "scope": "variable.other.object.property.js",

​          "settings": {

​            "foreground": "#77a8d9",

​            "fontStyle": "bold"

​          }

​        },

​        {

​          "scope": [

​            "keyword.operator.comparison.js",

​            "keyword.operator.assignment.js",

​            "keyword.operator.arithmetic.js"

​          ],

​          "settings": {

​            "foreground": "#e283d2",

​            "fontStyle": ""

​          }

​        },

<br>

#### Python

​		    {

​          "scope": [

​            "keyword.operator.assignment.python",

​            "keyword.operator.arithmetic.python",

​            "keyword.operator.comparison.python"

​          ],

​          "settings": {

​            "foreground": "#e283d2",

​            "fontStyle": ""

​          }

​        },

<br>

<br>

## 0.2.7 (2020-12-26)

- change color

  "terminal.ansiBlue": "#66b0e2"
