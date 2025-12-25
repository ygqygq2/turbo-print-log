import * as vscode from 'vscode';

import { ConfigManager } from '../config/settings';
import { getLanguageConfig } from '../core/languages';
import { LogParser } from '../core/log-parser';
import { Logger } from '../utils/logger';

/**
 * CodeLens Provider for log statements
 * Provides inline actions above each log statement
 */
export class LogCodeLensProvider implements vscode.CodeLensProvider {
  private parser: LogParser;
  private _onDidChangeCodeLenses: vscode.EventEmitter<void> = new vscode.EventEmitter<void>();
  public readonly onDidChangeCodeLenses: vscode.Event<void> = this._onDidChangeCodeLenses.event;

  constructor() {
    this.parser = new LogParser();
  }

  /**
   * Refresh CodeLens
   */
  refresh(): void {
    this._onDidChangeCodeLenses.fire();
  }

  /**
   * Provide CodeLens for the document
   */
  provideCodeLenses(
    document: vscode.TextDocument,
    _token: vscode.CancellationToken,
  ): vscode.CodeLens[] | Thenable<vscode.CodeLens[]> {
    const codeLenses: vscode.CodeLens[] = [];
    const config = ConfigManager.getConfig();
    const languageId = document.languageId;
    const languageConfig = getLanguageConfig(languageId);

    if (!languageConfig) {
      return codeLenses;
    }

    const prefix = config.prefix;
    const separator = config.separator;
    const logFunction = config.logFunction[languageId] || languageConfig.defaultLogFn;

    // Scan document for log statements
    for (let i = 0; i < document.lineCount; i++) {
      try {
        const line = document.lineAt(i);
        const lineText = line.text;

        const isLog = this.parser.isGeneratedLog(lineText, logFunction, prefix, separator);

        if (isLog) {
          const range = new vscode.Range(i, 0, i, lineText.length);

          // Create CodeLens actions
          codeLenses.push(
            // Update line number
            new vscode.CodeLens(range, {
              title: '$(sync) Update',
              command: 'turbo-print-var.updateSingleLog',
              arguments: [document.uri, i],
              tooltip: 'Update line number',
            }),
            // Comment/Uncomment
            new vscode.CodeLens(range, {
              title: lineText.trim().startsWith(languageConfig.commentSyntax.line)
                ? '$(comment-discussion) Uncomment'
                : '$(comment) Comment',
              command: 'turbo-print-var.toggleComment',
              arguments: [document.uri, i],
              tooltip: 'Comment or uncomment this log',
            }),
            // Delete
            new vscode.CodeLens(range, {
              title: '$(trash) Delete',
              command: 'turbo-print-var.deleteSingleLog',
              arguments: [document.uri, i],
              tooltip: 'Delete this log',
            }),
          );
        }
      } catch (error) {
        Logger.error(`CodeLens: Error at line ${i + 1}`, error as Error);
      }
    }

    return codeLenses;
  }
}
