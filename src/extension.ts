import * as vscode from 'vscode';

import {
  commentAllLogsCommand,
  deleteAllLogsCommand,
  deleteSingleLogCommand,
  insertLogCommand,
  toggleCommentCommand,
  uncommentAllLogsCommand,
  updateLineNumCommand,
  updateSingleLogCommand,
} from './commands';
import { ConfigManager } from './config/settings';
import { COMMANDS } from './constants';
import { LogCodeLensProvider } from './providers/log-codelens-provider';
import { LogTreeProvider } from './providers/log-tree-provider';
import { Logger } from './utils/logger';
import { createDebounce } from './utils/utils';

/**
 * 扩展激活
 */
export function activate(context: vscode.ExtensionContext): void {
  // 初始化日志器
  Logger.init();

  Logger.info('Turbo Print Var extension is now active!');

  const config = ConfigManager.getConfig();

  // 注册 CodeLens Provider（根据配置）
  let codeLensProvider: LogCodeLensProvider | undefined;
  if (config.enableCodeLens) {
    codeLensProvider = new LogCodeLensProvider();
    // 注册 CodeLens Provider，支持所有文件
    const codeLensDisposable = vscode.languages.registerCodeLensProvider(
      { scheme: 'file', pattern: '**/*' },
      codeLensProvider,
    );
    context.subscriptions.push(codeLensDisposable);
    Logger.info('CodeLens provider registered');
  }

  // 注册 TreeView Provider（根据配置）
  let treeProvider: LogTreeProvider | undefined;
  let debouncedTreeRefresh: (() => void) | undefined;
  if (config.enableTreeView) {
    treeProvider = new LogTreeProvider();
    const treeView = vscode.window.createTreeView('turboPrintVarStats', {
      treeDataProvider: treeProvider,
      showCollapseAll: true,
    });
    context.subscriptions.push(treeView);

    // 创建防抖刷新函数（10 秒延迟）
    const { debounced } = createDebounce(() => {
      treeProvider?.refresh();
    }, 10000);
    debouncedTreeRefresh = debounced;
    Logger.info('TreeView provider registered');
  }

  // 创建 CodeLens 防抖刷新（1 秒延迟）
  const debouncedCodeLensRefresh = codeLensProvider
    ? createDebounce(() => {
        Logger.debug('CodeLens: Refresh triggered by document change');
        codeLensProvider.refresh();
      }, 1000)
    : undefined;

  // 监听文档内容变化，仅在用户编辑时刷新
  const docChangeDisposable = vscode.workspace.onDidChangeTextDocument((event) => {
    // 只处理真实的文档编辑（忽略格式化、诊断等）
    if (event.contentChanges.length === 0 || event.document.uri.scheme !== 'file') {
      return;
    }

    // 刷新 TreeView（防抖）
    if (debouncedTreeRefresh) {
      debouncedTreeRefresh();
    }

    // 刷新 CodeLens（防抖，仅当前文档）
    if (debouncedCodeLensRefresh && event.document === vscode.window.activeTextEditor?.document) {
      debouncedCodeLensRefresh.debounced();
    }
  });
  context.subscriptions.push(docChangeDisposable);

  // 监听活动编辑器变化，刷新 TreeView（切换文件时）
  const editorChangeDisposable = vscode.window.onDidChangeActiveTextEditor(() => {
    if (treeProvider) {
      treeProvider.refresh();
    }
  });
  context.subscriptions.push(editorChangeDisposable);

  // 注册所有命令
  const commands = [
    vscode.commands.registerCommand(COMMANDS.INSERT_LOG, insertLogCommand),
    vscode.commands.registerCommand(COMMANDS.UPDATE_LINE_NUMBERS, updateLineNumCommand),
    vscode.commands.registerCommand(COMMANDS.COMMENT_LOGS, commentAllLogsCommand),
    vscode.commands.registerCommand(COMMANDS.UNCOMMENT_LOGS, uncommentAllLogsCommand),
    vscode.commands.registerCommand(COMMANDS.DELETE_LOGS, deleteAllLogsCommand),
    // CodeLens actions
    vscode.commands.registerCommand(COMMANDS.UPDATE_SINGLE_LOG, updateSingleLogCommand),
    vscode.commands.registerCommand(COMMANDS.TOGGLE_COMMENT, toggleCommentCommand),
    vscode.commands.registerCommand(COMMANDS.DELETE_SINGLE_LOG, deleteSingleLogCommand),
    // TreeView actions
    vscode.commands.registerCommand(COMMANDS.REFRESH_TREE, () => {
      if (codeLensProvider) {
        codeLensProvider.refresh();
      }
      if (treeProvider) {
        treeProvider.refresh();
      }
      vscode.window.showInformationMessage('Log statistics refreshed');
    }),
  ];

  // 将所有命令添加到订阅中
  commands.forEach((command) => context.subscriptions.push(command));

  Logger.info('All commands and providers registered successfully');
}

/**
 * 扩展停用
 */
export function deactivate(): void {
  Logger.info('Turbo Print Var extension is now deactivated');
}
