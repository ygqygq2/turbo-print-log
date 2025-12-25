/**
 * 扩展常量
 */

/**
 * 输出通道标题
 */
export const CHANNEL_TITLE = 'Turbo Print Var';

/**
 * 配置命名空间（用于读取VS Code配置）
 */
export const CONFIG_NAMESPACE = 'turbo-print-var';

/**
 * 命令ID前缀
 */
export const COMMAND_PREFIX = 'turbo-print-var';

/**
 * 命令ID
 */
export const COMMANDS = {
  INSERT_LOG: `${COMMAND_PREFIX}.insertLog`,
  UPDATE_LINE_NUMBERS: `${COMMAND_PREFIX}.updateLineNumbers`,
  COMMENT_LOGS: `${COMMAND_PREFIX}.commentLogs`,
  UNCOMMENT_LOGS: `${COMMAND_PREFIX}.uncommentLogs`,
  DELETE_LOGS: `${COMMAND_PREFIX}.deleteLogs`,
  // CodeLens actions
  UPDATE_SINGLE_LOG: `${COMMAND_PREFIX}.updateSingleLog`,
  TOGGLE_COMMENT: `${COMMAND_PREFIX}.toggleComment`,
  DELETE_SINGLE_LOG: `${COMMAND_PREFIX}.deleteSingleLog`,
  // TreeView actions
  REFRESH_TREE: `${COMMAND_PREFIX}.refreshTree`,
} as const;
