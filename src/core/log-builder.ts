import path from 'path';

import { CodeContext, LanguageConfig, LogBuildOptions, UserConfig } from '../types';
import { escapeString } from '../utils/text';

export class LogMessageBuilder {
  build(options: LogBuildOptions): string {
    const { variable, context, config, languageConfig } = options;
    const logFunction = this.getLogFunction(languageConfig, config);
    const logMessage = this.buildLogMessage(variable, context, config);
    let statement = this.buildLogStatement(logFunction, logMessage, variable, config.quote, languageConfig);

    if (config.addSemicolon === true && !statement.endsWith(';')) {
      statement += ';';
    }

    return statement;
  }

  private getLogFunction(languageConfig: LanguageConfig, config: UserConfig): string {
    if (config.logFunction[languageConfig.id]) {
      return config.logFunction[languageConfig.id];
    }
    return languageConfig.defaultLogFn;
  }

  private buildLogMessage(variable: string, context: CodeContext, config: UserConfig): string {
    const parts: string[] = [];

    if (config.prefix) {
      parts.push(config.prefix);
    }

    if (config.includeFileInfo) {
      const fileName = path.basename(context.fileName);
      parts.push(`file: ${fileName}:${context.lineNumber}`);
    }

    if (context.className) {
      parts.push(context.className);
    }

    if (context.functionName) {
      parts.push(context.functionName);
    }

    const prefix = parts.length > 0 ? parts.join(` ${config.separator} `) + ` ${config.separator} ` : '';
    return `${prefix}${variable}${config.suffix}`;
  }

  private buildLogStatement(
    logFunction: string,
    logMessage: string,
    variable: string,
    quote: '"' | "'" | '`',
    languageConfig: LanguageConfig,
  ): string {
    const escapedMessage = escapeString(logMessage, quote);
    return languageConfig.formatLog(logFunction, escapedMessage, variable, quote);
  }
}
