import { UserConfig } from '../types';

/**
 * 默认配置
 */
export const DEFAULT_CONFIG: UserConfig = {
  wrapLogMessage: false,
  prefix: '🚀',
  suffix: ': ',
  addSemicolon: undefined, // 未设置时使用语言默认值
  emptyLineBefore: false,
  emptyLineAfter: false,
  quote: '"',
  separator: '~',
  includeFileInfo: true,
  logFunction: {},
  enableCodeLens: false,
  enableTreeView: false,
};
