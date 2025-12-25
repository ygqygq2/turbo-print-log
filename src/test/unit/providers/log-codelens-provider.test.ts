import * as assert from 'assert';
import * as vscode from 'vscode';

import { LogCodeLensProvider } from '../../../providers/log-codelens-provider';

suite('LogCodeLensProvider Test Suite', () => {
  let provider: LogCodeLensProvider;

  setup(() => {
    provider = new LogCodeLensProvider();
  });

  test('provideCodeLenses - should detect Java log statement', async () => {
    const content = `String a = "a";
System.out.println("🚀 ~ file: test.java:2 ~ a: " + a);`;

    const document = await vscode.workspace.openTextDocument({
      language: 'java',
      content,
    });

    const codeLenses = provider.provideCodeLenses(document, {} as vscode.CancellationToken);

    assert.ok(Array.isArray(codeLenses), 'Should return array');
    assert.strictEqual((codeLenses as vscode.CodeLens[]).length, 3, 'Should have 3 CodeLens (Update, Comment, Delete)');

    const lenses = codeLenses as vscode.CodeLens[];
    assert.ok(lenses[0].command?.title.includes('Update'), 'First should be Update');
    assert.ok(lenses[1].command?.title.includes('Comment'), 'Second should be Comment');
    assert.ok(lenses[2].command?.title.includes('Delete'), 'Third should be Delete');
  });

  test('provideCodeLenses - should detect TypeScript log statement', async () => {
    const content = `const a = "test";
console.log("🚀 ~ file: test.ts:2 ~ a:", a);`;

    const document = await vscode.workspace.openTextDocument({
      language: 'typescript',
      content,
    });

    const codeLenses = provider.provideCodeLenses(document, {} as vscode.CancellationToken);

    assert.ok(Array.isArray(codeLenses), 'Should return array');
    assert.strictEqual((codeLenses as vscode.CodeLens[]).length, 3, 'Should have 3 CodeLens');
  });

  test('provideCodeLenses - should return empty for non-log lines', async () => {
    const content = `const a = "test";
const b = "another";`;

    const document = await vscode.workspace.openTextDocument({
      language: 'typescript',
      content,
    });

    const codeLenses = provider.provideCodeLenses(document, {} as vscode.CancellationToken);

    assert.ok(Array.isArray(codeLenses), 'Should return array');
    assert.strictEqual((codeLenses as vscode.CodeLens[]).length, 0, 'Should have no CodeLens');
  });

  test('provideCodeLenses - should detect commented log', async () => {
    const content = `const a = "test";
// console.log("🚀 ~ file: test.ts:2 ~ a:", a);`;

    const document = await vscode.workspace.openTextDocument({
      language: 'typescript',
      content,
    });

    const codeLenses = provider.provideCodeLenses(document, {} as vscode.CancellationToken);

    assert.ok(Array.isArray(codeLenses), 'Should return array');
    assert.strictEqual((codeLenses as vscode.CodeLens[]).length, 3, 'Should have 3 CodeLens');

    const lenses = codeLenses as vscode.CodeLens[];
    assert.ok(lenses[1].command?.title.includes('Uncomment'), 'Should show Uncomment for commented log');
  });

  test('provideCodeLenses - should return empty for unsupported language', async () => {
    const content = `This is plain text
With some content`;

    const document = await vscode.workspace.openTextDocument({
      language: 'plaintext',
      content,
    });

    const codeLenses = provider.provideCodeLenses(document, {} as vscode.CancellationToken);

    assert.ok(Array.isArray(codeLenses), 'Should return array');
    assert.strictEqual((codeLenses as vscode.CodeLens[]).length, 0, 'Should have no CodeLens for unsupported language');
  });

  test('refresh - should fire onDidChangeCodeLenses event', (done) => {
    provider.onDidChangeCodeLenses(() => {
      done();
    });

    provider.refresh();
  });
});
