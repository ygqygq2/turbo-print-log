import * as vscode from 'vscode';

import { ConfigManager } from '../config/settings';
import { getLanguageConfig } from '../core/languages';

/**
 * Update a single log statement's line number
 */
export async function updateSingleLogCommand(uri: vscode.Uri, lineNumber: number): Promise<void> {
  const document = await vscode.workspace.openTextDocument(uri);
  const editor = vscode.window.activeTextEditor;

  if (!editor || editor.document.uri.toString() !== uri.toString()) {
    return;
  }

  const config = ConfigManager.getConfig();
  const languageId = document.languageId;
  const languageConfig = getLanguageConfig(languageId);

  if (!languageConfig) {
    return;
  }

  const line = document.lineAt(lineNumber);
  const lineText = line.text;
  const separator = config.separator;

  // Extract the log message and update line number
  const linePattern = new RegExp(`:(\\d+)\\s*${separator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`);

  let updatedText = lineText;
  const actualLineNum = lineNumber + 1; // Convert to 1-based

  // Update line number
  updatedText = updatedText.replace(linePattern, `:${actualLineNum} ${separator}`);

  await editor.edit((editBuilder) => {
    editBuilder.replace(line.range, updatedText);
  });

  vscode.window.showInformationMessage(`Log line number updated to ${actualLineNum}`);
}

/**
 * Toggle comment on a single log statement
 */
export async function toggleCommentCommand(uri: vscode.Uri, lineNumber: number): Promise<void> {
  const document = await vscode.workspace.openTextDocument(uri);
  const editor = vscode.window.activeTextEditor;

  if (!editor || editor.document.uri.toString() !== uri.toString()) {
    return;
  }

  const languageConfig = getLanguageConfig(document.languageId);
  if (!languageConfig) {
    return;
  }

  const line = document.lineAt(lineNumber);
  const lineText = line.text;
  const commentSymbol = languageConfig.commentSyntax.line;

  let updatedText: string;
  const trimmedLine = lineText.trimStart();
  const leadingSpaces = lineText.substring(0, lineText.length - trimmedLine.length);

  if (trimmedLine.startsWith(commentSymbol)) {
    // Uncomment: remove comment symbol
    updatedText = leadingSpaces + trimmedLine.substring(commentSymbol.length).trimStart();
  } else {
    // Comment: add comment symbol
    updatedText = leadingSpaces + commentSymbol + ' ' + trimmedLine;
  }

  await editor.edit((editBuilder) => {
    editBuilder.replace(line.range, updatedText);
  });
}

/**
 * Delete a single log statement
 */
export async function deleteSingleLogCommand(uri: vscode.Uri, lineNumber: number): Promise<void> {
  const document = await vscode.workspace.openTextDocument(uri);
  const editor = vscode.window.activeTextEditor;

  if (!editor || editor.document.uri.toString() !== uri.toString()) {
    return;
  }

  const line = document.lineAt(lineNumber);

  // Delete the entire line including line break
  const range = new vscode.Range(
    lineNumber,
    0,
    lineNumber < document.lineCount - 1 ? lineNumber + 1 : lineNumber,
    lineNumber < document.lineCount - 1 ? 0 : line.range.end.character,
  );

  await editor.edit((editBuilder) => {
    editBuilder.delete(range);
  });

  vscode.window.showInformationMessage('Log statement deleted');
}
