# User Guide

## Installation

1. Open VS Code
2. Go to Extensions (`Ctrl+Shift+X`)
3. Search for "Turbo Print Var"
4. Click Install

## Quick Start

**Step 1:** Select a variable in your code

```javascript
const userName = 'Alice';
// Place cursor on 'userName' or select it
```

**Step 2:** Press `Ctrl+Alt+L` (Windows/Linux) or `Cmd+Alt+L` (Mac)

**Result:**

```javascript
const userName = 'Alice';
console.log('🚀 ~ file: app.js:2 ~ userName:', userName);
```

## Keyboard Shortcuts

| Action              | Windows/Linux | Mac           |
| ------------------- | ------------- | ------------- |
| Insert Log          | `Ctrl+Alt+L`  | `Cmd+Alt+L`   |
| Update Line Numbers | `Ctrl+Alt+U`  | `Cmd+Alt+U`   |
| Comment Logs        | `Alt+Shift+C` | `Alt+Shift+C` |
| Uncomment Logs      | `Alt+Shift+U` | `Alt+Shift+U` |
| Delete All Logs     | `Alt+Shift+D` | `Alt+Shift+D` |

## Advanced Features

### Multi-Cursor Support

Select multiple variables at once:

```javascript
const name = 'Bob';
const age = 30;
const city = 'NYC';
```

Press `Ctrl+Alt+L` to insert logs for all three variables.

### Custom Log Function

Configure per-language log functions in VS Code settings:

```json
{
  "turbo-print-var.logFn": {
    "javascript": "logger.debug",
    "python": "logging.info",
    "java": "logger.info"
  }
}
```

### Custom Format

Customize log appearance:

```json
{
  "turbo-print-var.prefix": "🔍",
  "turbo-print-var.separator": " | ",
  "turbo-print-var.quote": "'"
}
```

Output:

```javascript
console.log('🔍 | file: app.js:10 | user:', user);
```

## Configuration Options

| Setting                           | Description           | Default | Example              |
| --------------------------------- | --------------------- | ------- | -------------------- |
| `prefix`                          | Message prefix        | `🚀`    | `🔍`, `DEBUG`, `>>>` |
| `separator`                       | Element separator     | `~`     | `\|`, `-`, `>>`      |
| `quote`                           | Quote style           | `"`     | `'`, `` ` ``         |
| `logMessageSuffix`                | Suffix after variable | `:`     | `=`, `->`            |
| `includeFileNameAndLineNum`       | Show file context     | `true`  | `false`              |
| `addSemicolonInTheEnd`            | Add semicolon         | `false` | `true`               |
| `insertEmptyLineBeforeLogMessage` | Blank line before     | `false` | `true`               |
| `insertEmptyLineAfterLogMessage`  | Blank line after      | `false` | `true`               |

## Language Support

Supported languages with default log functions:

| Language              | Default Function     |
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

## Tips & Tricks

1. **Update Line Numbers After Refactoring**

   - Press `Ctrl+Alt+U` to update all line numbers if you've added/removed code

2. **Temporary Disable Logs**

   - Press `Alt+Shift+C` to comment all logs
   - Press `Alt+Shift+U` to uncomment when needed

3. **Clean Up Before Commit**

   - Press `Alt+Shift+D` to remove all debug logs

4. **Multi-Line Variables**
   - Works with object destructuring and multi-line expressions

## FAQ

### General Questions

**Q: Why isn't the log being inserted?**

A: Make sure:

- Your cursor is on a valid variable name
- The file language is supported (see Language Support section)
- You're not in a comment or string

**Q: Can I use this with multiple cursors?**

A: Yes! Place multiple cursors on different variables and press `Ctrl+Alt+L` to insert logs for all of them at once.

**Q: How do I change the log format?**

A: Go to VS Code Settings (`Ctrl+,`) and search for "turbo-print-var". You can customize:

- Prefix symbol
- Separator character
- Quote style
- Whether to include file name and line number

### Configuration Issues

**Q: My custom log function isn't working**

A: Check your settings.json:

```json
{
  "turbo-print-var.logFunction": {
    "javascript": "logger.debug",
    "python": "logging.info"
  }
}
```

Make sure the language ID matches VS Code's language identifier.

**Q: How do I disable file name and line number?**

A: Set `"turbo-print-var.includeFileInfo": false` in your settings.

**Q: Can I change the emoji prefix?**

A: Yes! Change `"turbo-print-var.prefix"` to any text or emoji you like:

```json
{
  "turbo-print-var.prefix": "DEBUG"
}
```

### Troubleshooting

**Q: Line numbers are wrong after editing**

A: Press `Ctrl+Alt+U` to update all line numbers in the current file.

**Q: How do I remove all logs at once?**

A: Press `Alt+Shift+D` to delete all logs generated by this extension. Note: This only removes logs that match the extension's pattern (with prefix and separator).

**Q: The extension doesn't recognize my language**

A: Currently supported languages are listed in the Language Support section. If your language isn't supported, you can:

1. Request support by opening an issue on GitHub
2. Use a similar language's log function via custom configuration

**Q: Can I use template literals (backticks) for quotes?**

A: Yes! Set `"turbo-print-var.quote": "`"` in your settings.

### Advanced Usage

**Q: How do I log inside functions/classes?**

A: The extension automatically detects the context and includes function/class names when available:

```javascript
class User {
  getName() {
    const name = 'Alice';
    // Generated log will include: ~ User ~ getName ~ name:
  }
}
```

**Q: Can I customize the separator between elements?**

A: Yes! Change `"turbo-print-var.separator"` to any string:

```json
{
  "turbo-print-var.separator": " | "
}
```

This will produce: `console.log('🚀 | file: app.js:10 | user:', user);`

**Q: Does it work with destructured variables?**

A: Yes! Place your cursor on the destructured variable name:

```javascript
const { name, age } = user;
// Cursor on 'name' will log: name
```
