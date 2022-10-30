import * as vscode from 'vscode'

export class TextDocumentChangeListener {

    private context: vscode.ExtensionContext;
    private disposable: vscode.Disposable | undefined

    public constructor(context: vscode.ExtensionContext) {
        this.context = context;
        this.disposable = this.setupDisposables();
    }
    setupDisposables(): vscode.Disposable {
        const textDocumentChangeListener = vscode.workspace.onDidChangeTextDocument(this.onTextDocumentChange, this);
        return vscode.Disposable.from(
            textDocumentChangeListener
        );
    }

    private async onTextDocumentChange(event: vscode.TextDocumentChangeEvent): Promise<void> {
        let text = event.contentChanges.map(change => change.text).join('');
        if (text.includes(" ") && text.length > 1) {
            console.log("copilot change: " + text);
        }
    }

    public dispose(): void {
        if (this.disposable) {
            this.disposable.dispose()
        }
    }

}