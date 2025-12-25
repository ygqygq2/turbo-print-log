import * as path from 'path';
import * as vscode from 'vscode';

import { ConfigManager } from '../config/settings';
import { getLanguageConfig } from '../core/languages';
import { LogParser } from '../core/log-parser';

/**
 * Tree item for log statistics
 */
export class LogTreeItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly type: 'root' | 'file' | 'stat',
    public readonly count?: number,
    public readonly uri?: vscode.Uri,
    public readonly lineNumber?: number,
  ) {
    super(label, collapsibleState);

    if (count !== undefined) {
      this.description = `${count}`;
    }

    // Set icons
    switch (type) {
      case 'root':
        this.iconPath = new vscode.ThemeIcon('folder');
        break;
      case 'file':
        this.iconPath = new vscode.ThemeIcon('file');
        this.resourceUri = uri;
        if (uri) {
          this.command = {
            command: 'vscode.open',
            title: 'Open File',
            arguments: [uri],
          };
        }
        break;
      case 'stat':
        this.iconPath = new vscode.ThemeIcon('symbol-number');
        break;
    }
  }
}

/**
 * TreeView Provider for log statistics
 */
export class LogTreeProvider implements vscode.TreeDataProvider<LogTreeItem> {
  private _onDidChangeTreeData: vscode.EventEmitter<LogTreeItem | undefined | null | void> = new vscode.EventEmitter<
    LogTreeItem | undefined | null | void
  >();
  readonly onDidChangeTreeData: vscode.Event<LogTreeItem | undefined | null | void> = this._onDidChangeTreeData.event;

  private parser: LogParser;

  constructor() {
    this.parser = new LogParser();
  }

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: LogTreeItem): vscode.TreeItem {
    return element;
  }

  async getChildren(element?: LogTreeItem): Promise<LogTreeItem[]> {
    if (!element) {
      // Root level
      return this.getRootItems();
    }

    // Children of root items
    if (element.label === 'Current File') {
      return this.getCurrentFileStats();
    } else if (element.label === 'Workspace') {
      return this.getWorkspaceFiles();
    }

    return [];
  }

  /**
   * Get root items
   */
  private getRootItems(): LogTreeItem[] {
    const currentFileCount = this.countLogsInCurrentFile();
    const workspaceCount = this.countLogsInWorkspace();

    return [
      new LogTreeItem('Current File', vscode.TreeItemCollapsibleState.Expanded, 'root', currentFileCount),
      new LogTreeItem('Workspace', vscode.TreeItemCollapsibleState.Collapsed, 'root', workspaceCount),
    ];
  }

  /**
   * Get current file statistics
   */
  private getCurrentFileStats(): LogTreeItem[] {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return [new LogTreeItem('No active file', vscode.TreeItemCollapsibleState.None, 'stat', 0)];
    }

    const stats = this.analyzeDocument(editor.document);

    return [
      new LogTreeItem('📝 Total Logs', vscode.TreeItemCollapsibleState.None, 'stat', stats.total),
      new LogTreeItem('✅ Active', vscode.TreeItemCollapsibleState.None, 'stat', stats.active),
      new LogTreeItem('💬 Commented', vscode.TreeItemCollapsibleState.None, 'stat', stats.commented),
    ];
  }

  /**
   * Get workspace files with logs
   */
  private async getWorkspaceFiles(): Promise<LogTreeItem[]> {
    const files: LogTreeItem[] = [];
    const workspaceFolders = vscode.workspace.workspaceFolders;

    if (!workspaceFolders) {
      return files;
    }

    // 只扫描已打开的文档，避免遍历整个工作区
    const documents = vscode.workspace.textDocuments;

    for (const doc of documents) {
      // 只统计文件类型的文档，跳过输出、调试控制台等
      if (doc.uri.scheme !== 'file' || doc.isClosed) {
        continue;
      }

      const stats = this.analyzeDocument(doc);
      if (stats.total > 0) {
        const fileName = path.basename(doc.uri.fsPath);
        files.push(new LogTreeItem(fileName, vscode.TreeItemCollapsibleState.None, 'file', stats.total, doc.uri));
      }
    }

    // 限制显示数量，避免过多文件导致卡顿
    return files.sort((a, b) => (b.count || 0) - (a.count || 0)).slice(0, 50);
  }

  /**
   * Count logs in current file
   */
  private countLogsInCurrentFile(): number {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return 0;
    }

    return this.analyzeDocument(editor.document).total;
  }

  /**
   * Count logs in workspace
   */
  private countLogsInWorkspace(): number {
    let total = 0;
    const documents = vscode.workspace.textDocuments;

    for (const doc of documents) {
      // 只统计文件类型的文档
      if (doc.uri.scheme === 'file' && !doc.isClosed) {
        total += this.analyzeDocument(doc).total;
      }
    }

    return total;
  }

  /**
   * Analyze document for log statistics
   */
  private analyzeDocument(document: vscode.TextDocument): {
    total: number;
    active: number;
    commented: number;
  } {
    const config = ConfigManager.getConfig();
    const languageId = document.languageId;
    const languageConfig = getLanguageConfig(languageId);

    if (!languageConfig) {
      return { total: 0, active: 0, commented: 0 };
    }

    const prefix = config.prefix;
    const separator = config.separator;
    const logFunction = config.logFunction[languageId] || languageConfig.defaultLogFn;

    let total = 0;
    let active = 0;
    let commented = 0;

    for (let i = 0; i < document.lineCount; i++) {
      const lineText = document.lineAt(i).text;

      if (this.parser.isGeneratedLog(lineText, logFunction, prefix, separator)) {
        total++;

        if (lineText.trim().startsWith(languageConfig.commentSyntax.line)) {
          commented++;
        } else {
          active++;
        }
      }
    }

    return { total, active, commented };
  }
}
