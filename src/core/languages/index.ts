import { LanguageConfig } from '../../types';

/**
 * 语言配置注册表
 *
 * 添加新语言时，注意formatLog的两种模式：
 * - 逗号分隔（msg后无空格）: `"msg"` → `console.log("msg", variable)`
 * - 运算符拼接（msg后有空格）: `"msg "` → `println("msg " + variable)`
 */
const languageRegistry: Map<string, LanguageConfig> = new Map();

/**
 * 注册语言配置
 */
export function registerLanguage(config: LanguageConfig): void {
  languageRegistry.set(config.id, config);
}

/**
 * 获取语言配置
 */
export function getLanguageConfig(languageId: string): LanguageConfig | undefined {
  return languageRegistry.get(languageId);
}

/**
 * 是否支持该语言
 */
export function isLanguageSupported(languageId: string): boolean {
  return languageRegistry.has(languageId);
}

/**
 * 获取所有支持的语言ID
 */
export function getSupportedLanguages(): string[] {
  return Array.from(languageRegistry.keys());
}

// JavaScript/TypeScript 系列
registerLanguage({
  id: 'javascript',
  defaultLogFn: 'console.log',
  commentSyntax: { line: '//' },
  defaultStringQuote: '"',
  needsSemicolon: true,
  formatLog: (logFn, msg, variable, quote) => `${logFn}(${quote}${msg}${quote}, ${variable})`,
});

registerLanguage({
  id: 'typescript',
  defaultLogFn: 'console.log',
  commentSyntax: { line: '//' },
  defaultStringQuote: '"',
  needsSemicolon: true,
  formatLog: (logFn, msg, variable, quote) => `${logFn}(${quote}${msg}${quote}, ${variable})`,
});

registerLanguage({
  id: 'javascriptreact',
  defaultLogFn: 'console.log',
  commentSyntax: { line: '//' },
  defaultStringQuote: '"',
  needsSemicolon: true,
  formatLog: (logFn, msg, variable, quote) => `${logFn}(${quote}${msg}${quote}, ${variable})`,
});

registerLanguage({
  id: 'typescriptreact',
  defaultLogFn: 'console.log',
  commentSyntax: { line: '//' },
  defaultStringQuote: '"',
  needsSemicolon: true,
  formatLog: (logFn, msg, variable, quote) => `${logFn}(${quote}${msg}${quote}, ${variable})`,
});

// Python
registerLanguage({
  id: 'python',
  defaultLogFn: 'print',
  commentSyntax: { line: '#' },
  defaultStringQuote: '"',
  needsSemicolon: false,
  formatLog: (logFn, msg, variable, quote) => `${logFn}(${quote}${msg}${quote}, ${variable})`,
});

// Java
registerLanguage({
  id: 'java',
  defaultLogFn: 'System.out.println',
  commentSyntax: { line: '//' },
  defaultStringQuote: '"',
  needsSemicolon: true,
  formatLog: (logFn, msg, variable, quote) => `${logFn}(${quote}${msg}${quote} + ${variable});`,
});

registerLanguage({
  id: 'c',
  defaultLogFn: 'printf',
  commentSyntax: { line: '//' },
  defaultStringQuote: '"',
  needsSemicolon: true,
  formatLog: (logFn, msg, variable, quote) => `${logFn}(${quote}${msg} %s\\n${quote}, ${variable});`,
});

// C++
registerLanguage({
  id: 'cpp',
  defaultLogFn: 'std::cout',
  commentSyntax: { line: '//' },
  defaultStringQuote: '"',
  needsSemicolon: true,
  formatLog: (logFn, msg, variable, quote) => `${logFn} << ${quote}${msg}${quote} << ${variable} << std::endl;`,
});

// C#
registerLanguage({
  id: 'csharp',
  defaultLogFn: 'Console.WriteLine',
  commentSyntax: { line: '//' },
  defaultStringQuote: '"',
  needsSemicolon: true,
  formatLog: (logFn, msg, variable, quote) => `${logFn}(${quote}${msg}${quote} + ${variable});`,
});

// Go
registerLanguage({
  id: 'go',
  defaultLogFn: 'fmt.Println',
  commentSyntax: { line: '//' },
  defaultStringQuote: '"',
  needsSemicolon: false,
  formatLog: (logFn, msg, variable, quote) => `${logFn}(${quote}${msg}${quote}, ${variable})`,
});

// Rust
registerLanguage({
  id: 'rust',
  defaultLogFn: 'println!',
  commentSyntax: { line: '//' },
  defaultStringQuote: '"',
  needsSemicolon: true,
  formatLog: (logFn, msg, variable, quote) => `${logFn}(${quote}${msg} {}${quote}, ${variable});`,
});

// PHP
registerLanguage({
  id: 'php',
  defaultLogFn: 'echo',
  commentSyntax: { line: '//' },
  defaultStringQuote: '"',
  needsSemicolon: true,
  formatLog: (logFn, msg, variable, quote) => {
    const escapedMsg = msg.replace(/\$/g, '\\$');
    return `${logFn} ${quote}${escapedMsg}${quote} . ${variable};`;
  },
});

// Ruby
registerLanguage({
  id: 'ruby',
  defaultLogFn: 'puts',
  commentSyntax: { line: '#' },
  defaultStringQuote: '"',
  needsSemicolon: false,
  formatLog: (logFn, msg, variable, quote) => `${logFn} ${quote}${msg}${quote} + ${variable}`,
});

// Swift
registerLanguage({
  id: 'swift',
  defaultLogFn: 'print',
  commentSyntax: { line: '//' },
  defaultStringQuote: '"',
  needsSemicolon: false,
  formatLog: (logFn, msg, variable, quote) => `${logFn}(${quote}${msg}${quote}, ${variable})`,
});

// Kotlin
registerLanguage({
  id: 'kotlin',
  defaultLogFn: 'println',
  commentSyntax: { line: '//' },
  defaultStringQuote: '"',
  needsSemicolon: false,
  formatLog: (logFn, msg, variable, quote) => `${logFn}(${quote}${msg}${quote} + ${variable});`,
});

// Scala
registerLanguage({
  id: 'scala',
  defaultLogFn: 'println',
  commentSyntax: { line: '//' },
  defaultStringQuote: '"',
  needsSemicolon: false,
  formatLog: (logFn, msg, variable, quote) => `${logFn}(${quote}${msg}${quote} + ${variable});`,
});

// Groovy
registerLanguage({
  id: 'groovy',
  defaultLogFn: 'println',
  commentSyntax: { line: '//' },
  defaultStringQuote: '"',
  needsSemicolon: false,
  formatLog: (logFn, msg, variable, quote) => `${logFn} ${quote}${msg}${quote} + ${variable}`,
});

// Dart
registerLanguage({
  id: 'dart',
  defaultLogFn: 'print',
  commentSyntax: { line: '//' },
  defaultStringQuote: '"',
  needsSemicolon: true,
  formatLog: (logFn, msg, variable, quote) => `${logFn}(${quote}${msg}${quote} + ${variable});`,
});

// Lua
registerLanguage({
  id: 'lua',
  defaultLogFn: 'print',
  commentSyntax: { line: '--' },
  defaultStringQuote: '"',
  needsSemicolon: false,
  formatLog: (logFn, msg, variable, quote) => `${logFn}(${quote}${msg}${quote}, ${variable})`,
});

// Perl
registerLanguage({
  id: 'perl',
  defaultLogFn: 'print',
  commentSyntax: { line: '#' },
  defaultStringQuote: '"',
  needsSemicolon: true,
  formatLog: (logFn, msg, variable, quote) => {
    const escapedMsg = msg.replace(/\$/g, '\\$');
    return `${logFn} ${quote}${escapedMsg}${quote} . ${variable};`;
  },
});

// R
registerLanguage({
  id: 'r',
  defaultLogFn: 'print',
  commentSyntax: { line: '#' },
  defaultStringQuote: '"',
  needsSemicolon: false,
  formatLog: (logFn, msg, variable, quote) => `${logFn}(paste(${quote}${msg}${quote}, ${variable}))`,
});

// Shell Script
registerLanguage({
  id: 'shellscript',
  defaultLogFn: 'echo',
  commentSyntax: { line: '#' },
  defaultStringQuote: '"',
  needsSemicolon: false,
  formatLog: (logFn, msg, variable, quote) => `${logFn} ${quote}${msg}${quote} \${${variable}}`,
});

// CoffeeScript
registerLanguage({
  id: 'coffeescript',
  defaultLogFn: 'console.log',
  commentSyntax: { line: '#' },
  defaultStringQuote: '"',
  needsSemicolon: false,
  formatLog: (logFn, msg, variable, quote) => `${logFn} ${quote}${msg}${quote} + ${variable}`,
});
