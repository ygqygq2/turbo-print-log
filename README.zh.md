# Turbo Print Log

[![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/ygqygq2.turbo-print-log.svg?color=07c160&label=turbo-print-log&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=ygqygq2.turbo-print-log)
[![Visual Studio Marketplace Installs](https://img.shields.io/visual-studio-marketplace/i/ygqygq2.turbo-print-log)](https://marketplace.visualstudio.com/items?itemName=ygqygq2.turbo-print-log)
[![Open VSX Downloads](https://img.shields.io/open-vsx/dt/ygqygq2/turbo-print-log?label=open-vsx%20downloads)](https://open-vsx.org/extension/ygqygq2/turbo-print-log)

[English](./README.md) | [中文](./README.zh.md)

---

### 🚀 主要功能

**Turbo Print Log** 是一个强大的 VS Code 扩展，可以为 **22+ 种编程语言**自动插入调试日志。它能智能生成包含文件名、行号和变量信息的上下文日志语句。

### ✨ 核心亮点

- 🌍 **多语言支持**：JavaScript/TypeScript、Python、Java、C/C++、Go、Rust、PHP、Ruby、Swift、Kotlin、Scala等
- 🎯 **智能变量检测**：自动检测光标位置或选中的变量
- 📍 **上下文感知**：日志输出包含文件名和行号
- ⚡ **多光标支持**：同时处理多个变量
- 🎨 **可自定义格式**：配置日志前缀、分隔符、引号等
- 🔧 **强大命令**：插入、更新、注释、取消注释、删除日志

### 📖 使用方法

#### 1. 插入日志语句

1. 选中变量或将光标放在变量上
2. 按 `Ctrl+Alt+L` (Windows/Linux) 或 `Cmd+Alt+L` (Mac)
3. 日志语句将被插入到下一行

**输出示例：**

```javascript
const user = { name: 'John' };
console.log('🚀 ~ file: app.js:2 ~ user:', user);
```

#### 2. 更新行号

- 按 `Ctrl+Alt+U` (Windows/Linux) 或 `Cmd+Alt+U` (Mac)
- 更新所有日志语句中的行号

#### 3. 注释/取消注释日志

- **注释**：`Alt+Shift+C`
- **取消注释**：`Alt+Shift+U`

#### 4. 删除所有日志

- 按 `Alt+Shift+D` 删除所有生成的日志语句

### ⚙️ 配置选项

| 设置                                              | 说明                          | 默认值  |
| ------------------------------------------------- | ----------------------------- | ------- |
| `turbo-print-log.logMessagePrefix`                | 日志消息前缀                  | `🚀`    |
| `turbo-print-log.logMessageSuffix`                | 变量名后的后缀                | `:`     |
| `turbo-print-log.delimiterInsideMessage`          | 元素之间的分隔符              | `~`     |
| `turbo-print-log.quote`                           | 引号样式（`"`、`'`、`` ` ``） | `"`     |
| `turbo-print-log.includeFileNameAndLineNum`       | 包含文件名和行号              | `true`  |
| `turbo-print-log.addSemicolonInTheEnd`            | 末尾添加分号                  | `false` |
| `turbo-print-log.insertEmptyLineBeforeLogMessage` | 日志前插入空行                | `false` |
| `turbo-print-log.insertEmptyLineAfterLogMessage`  | 日志后插入空行                | `false` |
| `turbo-print-log.logFunction`                     | 每种语言的自定义日志函数      | `{}`    |

### 🌐 支持的语言

- C
- C++
- C#
- CoffeeScript
- Dart
- Go
- Groovy
- Java
- JavaScript
- Kotlin
- Lua
- Perl
- PHP
- Python
- R
- Ruby
- Rust
- Scala
- Shell Script
- Swift
- TypeScript

### 📝 许可证

MIT
