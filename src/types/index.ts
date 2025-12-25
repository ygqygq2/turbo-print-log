/**
 * 核心类型定义
 */

/**
 * 用户配置接口
 */
export interface UserConfig {
  wrapLogMessage: boolean;
  prefix: string;
  suffix: string;
  addSemicolon: boolean | undefined; // undefined 表示使用语言默认值
  emptyLineBefore: boolean;
  emptyLineAfter: boolean;
  quote: '"' | "'" | '`';
  separator: string;
  includeFileInfo: boolean;
  logFunction: Record<string, string>;
  enableCodeLens: boolean;
  enableTreeView: boolean;
}

/**
 * 变量信息
 */
export interface VariableInfo {
  name: string;
  line: number;
  character: number;
}

/**
 * 代码上下文
 */
export interface CodeContext {
  fileName: string;
  lineNumber: number;
  className?: string;
  functionName?: string;
}

/**
 * 日志语句
 */
export interface LogStatement {
  text: string;
  line: number;
  isGenerated: boolean; // 是否由本扩展生成
}

/**
 * 语言配置接口
 */
export interface LanguageConfig {
  id: string;
  defaultLogFn: string;
  /**
   * 格式化日志语句
   *
   * 关键规则：
   * 1. 逗号分隔语言（JS/Python/Go等）：message后无空格
   *    `${logFn}(${quote}${msg}${quote}, ${variable})`
   *    生成: console.log("a:", a)
   *
   * 2. 运算符拼接语言（Java/C++/Ruby等）：message后需要空格
   *    `${logFn}(${quote}${msg} ${quote} + ${variable});`
   *    生成: System.out.println("a: " + a);
   *                                  ↑注意空格
   *
   * 3. 特殊格式语言：
   *    - C: `${quote}${msg} %s\\n${quote}`
   *    - Rust: `${quote}${msg} {}${quote}`
   *
   * 4. 需要转义的语言（PHP/Perl的$符号）：
   *    const escapedMsg = msg.replace(/\$/g, '\\$');
   *
   * @param logFunction 日志函数名
   * @param message 日志消息内容（已包含用户配置的suffix）
   * @param variable 变量名
   * @param quote 引号类型
   * @returns 完整的日志语句（包含分号如需要）
   */
  formatLog: (logFunction: string, message: string, variable: string, quote: string) => string;
  commentSyntax: CommentSyntax;
  defaultStringQuote: '"' | "'" | '`';
  needsSemicolon: boolean;
}

/**
 * 注释语法
 */
export interface CommentSyntax {
  line: string; // 单行注释符号，如 '//' 或 '#'
}

/**
 * 日志构建选项
 */
export interface LogBuildOptions {
  variable: string;
  context: CodeContext;
  config: UserConfig;
  languageConfig: LanguageConfig;
}
