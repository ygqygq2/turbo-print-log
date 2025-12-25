import * as vscode from 'vscode';

import { CONFIG_NAMESPACE } from '../constants';
import { UserConfig } from '../types';
import { DEFAULT_CONFIG } from './defaults';

/**
 * 配置管理器
 */
export class ConfigManager {
  /**
   * 获取用户配置
   */
  static getConfig(): UserConfig {
    const workspaceConfig = vscode.workspace.getConfiguration(CONFIG_NAMESPACE);

    return {
      wrapLogMessage: workspaceConfig.get('wrapLogMessage', DEFAULT_CONFIG.wrapLogMessage),
      prefix: workspaceConfig.get('prefix', DEFAULT_CONFIG.prefix),
      suffix: workspaceConfig.get('suffix', DEFAULT_CONFIG.suffix),
      addSemicolon: workspaceConfig.get('addSemicolon', DEFAULT_CONFIG.addSemicolon),
      emptyLineBefore: workspaceConfig.get('emptyLineBefore', DEFAULT_CONFIG.emptyLineBefore),
      emptyLineAfter: workspaceConfig.get('emptyLineAfter', DEFAULT_CONFIG.emptyLineAfter),
      quote: this.validateQuote(workspaceConfig.get('quote', DEFAULT_CONFIG.quote)),
      separator: workspaceConfig.get('separator', DEFAULT_CONFIG.separator),
      includeFileInfo: workspaceConfig.get('includeFileInfo', DEFAULT_CONFIG.includeFileInfo),
      logFunction: workspaceConfig.get('logFunction', DEFAULT_CONFIG.logFunction),
      enableCodeLens: workspaceConfig.get('enableCodeLens', true),
      enableTreeView: workspaceConfig.get('enableTreeView', true),
    };
  }

  /**
   * 验证引号配置
   */
  private static validateQuote(quote: string): '"' | "'" | '`' {
    if (quote === '"' || quote === "'" || quote === '`') {
      return quote;
    }
    return DEFAULT_CONFIG.quote;
  }
}
