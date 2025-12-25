# 用户指南

## 安装

1. 打开 VS Code
2. 进入扩展面板 (`Ctrl+Shift+X`)
3. 搜索 "Turbo Print Var"
4. 点击安装

## 快速开始

**步骤 1：** 在代码中选中变量

```javascript
const userName = 'Alice';
// 将光标放在 'userName' 上或选中它
```

**步骤 2：** 按 `Ctrl+Alt+L` (Windows/Linux) 或 `Cmd+Alt+L` (Mac)

**结果：**

```javascript
const userName = 'Alice';
console.log('🚀 ~ file: app.js:2 ~ userName:', userName);
```

## 快捷键

| 操作         | Windows/Linux | Mac           |
| ------------ | ------------- | ------------- |
| 插入日志     | `Ctrl+Alt+L`  | `Cmd+Alt+L`   |
| 更新行号     | `Ctrl+Alt+U`  | `Cmd+Alt+U`   |
| 注释日志     | `Alt+Shift+C` | `Alt+Shift+C` |
| 取消注释     | `Alt+Shift+U` | `Alt+Shift+U` |
| 删除所有日志 | `Alt+Shift+D` | `Alt+Shift+D` |

## 高级功能

### 多光标支持

同时选中多个变量：

```javascript
const name = 'Bob';
const age = 30;
const city = 'NYC';
```

按 `Ctrl+Alt+L` 为三个变量同时插入日志。

### 自定义日志函数

在 VS Code 设置中配置每种语言的日志函数：

```json
{
  "turbo-print-var.logFunction": {
    "javascript": "logger.debug",
    "python": "logging.info",
    "java": "logger.info",
    "php": "error_log"
  }
}
```

**注意**：配置名称是 `logFunction`（对象类型），不是 `logFn`。

### 自定义格式

自定义日志外观：

```json
{
  "turbo-print-var.prefix": "🔍",
  "turbo-print-var.separator": " | ",
  "turbo-print-var.quote": "'"
}
```

输出：

```javascript
console.log('🔍 | file: app.js:10 | user:', user);
```

## 配置选项

| 设置                 | 说明                   | 默认值  | 示例                 |
| -------------------- | ---------------------- | ------- | -------------------- |
| `prefix`             | 消息前缀               | `🚀`    | `🔍`, `DEBUG`, `>>>` |
| `suffix`             | 变量名后缀             | `:`     | `=`, `->`            |
| `separator`          | 元素分隔符             | `~`     | `\|`, `-`, `>>`      |
| `quote`              | 引号样式               | `"`     | `'`, `` ` ``         |
| `includeFileInfo`    | 显示文件名和行号       | `true`  | `false`              |
| `addSemicolon`       | 添加分号               | 语言默认 | `true`, `false`      |
| `emptyLineBefore`    | 日志前插入空行         | `false` | `true`               |
| `emptyLineAfter`     | 日志后插入空行         | `false` | `true`               |
| `logFunction`        | 自定义日志函数（对象） | `{}`    | 见下文               |
| `enableCodeLens`     | 启用 CodeLens 功能     | `false` | `true`               |
| `enableTreeView`     | 启用统计面板           | `false` | `true`               |

### CodeLens 功能

启用后，在每个日志语句上方显示操作按钮：

```json
{
  "turbo-print-var.enableCodeLens": true
}
```

功能：
- **Update**: 更新行号
- **Comment**: 注释/取消注释
- **Delete**: 删除日志

### TreeView 统计面板

启用后，在侧边栏显示日志统计：

```json
{
  "turbo-print-var.enableTreeView": true
}
```

显示内容：
- **Current File**: 当前文件的总数、活跃、已注释日志数
- **Workspace**: 所有已打开文件的日志列表（最多 50 个）

## 语言支持

支持的语言及默认日志函数：

| 语言                  | 默认函数             |
| --------------------- | -------------------- |
| JavaScript/TypeScript | `console.log`        |
| Python                | `print`              |
| Java                  | `System.out.println` |
| C                     | `printf`             |
| C++                   | `std::cout`          |
| C#                    | `Console.WriteLine`  |
| Go                    | `fmt.Println`        |
| Rust                  | `println!`           |
| PHP                   | `echo`               |
| Ruby                  | `puts`               |
| Swift                 | `print`              |
| Kotlin                | `println`            |
| Scala                 | `println`            |
| Groovy                | `println`            |
| Dart                  | `print`              |
| Lua                   | `print`              |
| Perl                  | `print`              |
| R                     | `print`              |
| Shell Script          | `echo`               |
| CoffeeScript          | `console.log`        |

## 使用技巧

1. **重构后更新行号**

   - 添加/删除代码后,按 `Ctrl+Alt+U` 更新所有行号

2. **临时禁用日志**

   - 按 `Alt+Shift+C` 注释所有日志
   - 需要时按 `Alt+Shift+U` 取消注释

3. **提交前清理**

   - 按 `Alt+Shift+D` 删除所有调试日志

4. **多行变量**
   - 支持对象解构和多行表达式

## 常见问题（FAQ）

### 通用问题

**Q: 为什么日志没有被插入？**

A: 请确保：

- 光标位于有效的变量名上
- 文件语言被支持（查看语言支持章节）
- 不在注释或字符串内

**Q: 可以使用多光标吗？**

A: 可以！在不同变量上放置多个光标，然后按 `Ctrl+Alt+L` 即可同时插入所有日志。

**Q: 如何修改日志格式？**

A: 打开 VS Code 设置（`Ctrl+,`）并搜索 "turbo-print-var"。您可以自定义：

- 前缀符号
- 分隔符
- 引号样式
- 是否包含文件名和行号

### 配置问题

**Q: 自定义日志函数不生效**

A: 检查您的 settings.json：

```json
{
  "turbo-print-var.logFunction": {
    "javascript": "logger.debug",
    "python": "logging.info"
  }
}
```

确保语言 ID 与 VS Code 的语言标识符匹配。

**Q: 如何禁用文件名和行号？**

A: 在设置中设置 `"turbo-print-var.includeFileInfo": false`。

**Q: 可以修改 emoji 前缀吗？**

A: 可以！将 `"turbo-print-var.prefix"` 改为任意文本或 emoji：

```json
{
  "turbo-print-var.prefix": "DEBUG"
}
```

### 故障排除

**Q: 编辑后行号不对**

A: 按 `Ctrl+Alt+U` 更新当前文件中的所有行号。

**Q: 如何一次性删除所有日志？**

A: 按 `Alt+Shift+D` 删除所有由此扩展生成的日志。注意：只会删除匹配扩展模式（包含前缀和分隔符）的日志。

**Q: 扩展不识别我的语言**

A: 当前支持的语言列在语言支持章节中。如果不支持您的语言，可以：

1. 在 GitHub 上提问请求支持
2. 通过自定义配置使用类似语言的日志函数

**Q: 可以使用模板字符串（反引号）作为引号吗？**

A: 可以！在设置中设置 `"turbo-print-var.quote": "`"`。

### 高级用法

**Q: 如何在函数/类内部记录日志？**

A: 扩展会自动检测上下文，并在可用时包含函数/类名：

```javascript
class User {
  getName() {
    const name = 'Alice';
    // 生成的日志会包含：~ User ~ getName ~ name:
  }
}
```

**Q: 可以自定义元素之间的分隔符吗？**

A: 可以！将 `"turbo-print-var.separator"` 改为任意字符串：

```json
{
  "turbo-print-var.separator": " | "
}
```

这将生成：`console.log('🚀 | file: app.js:10 | user:', user);`

**Q: 支持解构变量吗？**

A: 支持！将光标放在解构的变量名上：

```javascript
const { name, age } = user;
// 光标在 'name' 上将记录：name
```
