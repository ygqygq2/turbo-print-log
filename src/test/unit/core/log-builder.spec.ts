import { describe, expect, it } from 'vitest';

import { LogMessageBuilder } from '../../../core/log-builder';
import { LanguageConfig, UserConfig } from '../../../types';

describe('LogMessageBuilder', () => {
  const mockConfig: UserConfig = {
    prefix: '🚀',
    suffix: ':',
    addSemicolon: undefined,
    emptyLineBefore: false,
    emptyLineAfter: false,
    quote: '"',
    separator: '~',
    includeFileInfo: true,
    logFunction: {},
  };

  const jsConfig: LanguageConfig = {
    id: 'javascript',
    defaultLogFn: 'console.log',
    commentSyntax: { line: '//' },
    defaultStringQuote: '"',
    needsSemicolon: true,
    formatLog: (logFn, msg, variable, quote) => `${logFn}(${quote}${msg}${quote}, ${variable})`,
  };

  it('应该构建基本的JavaScript日志语句', () => {
    const builder = new LogMessageBuilder();
    const result = builder.build({
      variable: 'user',
      context: {
        fileName: '/path/to/app.js',
        lineNumber: 10,
      },
      config: mockConfig,
      languageConfig: jsConfig,
    });

    expect(result).toContain('console.log');
    expect(result).toContain('user');
    expect(result).toContain('🚀');
    expect(result).toContain('app.js:10');
  });

  it('应该使用自定义日志函数', () => {
    const customConfig = {
      ...mockConfig,
      logFunction: { javascript: 'logger.debug' },
    };

    const builder = new LogMessageBuilder();
    const result = builder.build({
      variable: 'data',
      context: {
        fileName: 'test.js',
        lineNumber: 5,
      },
      config: customConfig,
      languageConfig: jsConfig,
    });

    expect(result).toContain('logger.debug');
  });

  it('应该在需要时添加分号', () => {
    const configWithSemicolon = {
      ...mockConfig,
      addSemicolon: true,
    };

    const builder = new LogMessageBuilder();
    const result = builder.build({
      variable: 'test',
      context: {
        fileName: 'file.js',
        lineNumber: 1,
      },
      config: configWithSemicolon,
      languageConfig: jsConfig,
    });

    expect(result).toMatch(/;$/);
  });

  it('应该支持不包含文件名和行号', () => {
    const configWithoutContext = {
      ...mockConfig,
      includeFileInfo: false,
    };

    const builder = new LogMessageBuilder();
    const result = builder.build({
      variable: 'value',
      context: {
        fileName: 'test.js',
        lineNumber: 99,
      },
      config: configWithoutContext,
      languageConfig: jsConfig,
    });

    expect(result).not.toContain('test.js');
    expect(result).not.toContain(':99');
  });

  it('应该使用配置的分隔符', () => {
    const customSeparator = {
      ...mockConfig,
      separator: ' | ',
    };

    const builder = new LogMessageBuilder();
    const result = builder.build({
      variable: 'item',
      context: {
        fileName: 'app.js',
        lineNumber: 20,
      },
      config: customSeparator,
      languageConfig: jsConfig,
    });

    expect(result).toContain(' | ');
  });
});
