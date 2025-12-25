/**
 * 自定义错误类型定义
 */

/**
 * 基础扩展错误
 */
export class ExtensionError extends Error {
  constructor(
    message: string,
    public code: string,
    public cause?: Error,
  ) {
    super(message);
    this.name = 'ExtensionError';
  }
}

/**
 * 配置错误 (TPL-100x)
 */
export class ConfigError extends ExtensionError {
  constructor(message: string, code: string, cause?: Error) {
    super(message, code, cause);
    this.name = 'ConfigError';
  }
}

/**
 * 编辑器错误 (TPL-200x)
 */
export class EditorError extends ExtensionError {
  constructor(message: string, code: string, cause?: Error) {
    super(message, code, cause);
    this.name = 'EditorError';
  }
}

/**
 * 解析错误 (TPL-300x)
 */
export class ParseError extends ExtensionError {
  constructor(
    message: string,
    code: string,
    public filePath?: string,
    cause?: Error,
  ) {
    super(message, code, cause);
    this.name = 'ParseError';
  }
}

/**
 * 系统错误 (TPL-400x)
 */
export class SystemError extends ExtensionError {
  constructor(message: string, code: string, cause?: Error) {
    super(message, code, cause);
    this.name = 'SystemError';
  }
}

/**
 * 错误码常量
 * TPL = Turbo Print Var
 */
export const ErrorCodes = {
  // 配置类 TPL-100x
  TPL_1001: 'TPL-1001',
  TPL_1002: 'TPL-1002',
  TPL_1003: 'TPL-1003',
  TPL_1004: 'TPL-1004',

  // 编辑器类 TPL-200x
  TPL_2001: 'TPL-2001',
  TPL_2002: 'TPL-2002',
  TPL_2003: 'TPL-2003',
  TPL_2004: 'TPL-2004',
  TPL_2005: 'TPL-2005',

  // 解析类 TPL-300x
  TPL_3001: 'TPL-3001',
  TPL_3002: 'TPL-3002',
  TPL_3003: 'TPL-3003',
  TPL_3004: 'TPL-3004',

  // 系统类 TPL-400x
  TPL_4001: 'TPL-4001',
  TPL_4002: 'TPL-4002',
  TPL_4003: 'TPL-4003',
} as const;

/**
 * 错误码类型
 */
export type ErrorCode = (typeof ErrorCodes)[keyof typeof ErrorCodes];
