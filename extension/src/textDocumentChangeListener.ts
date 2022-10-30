import * as vscode from 'vscode'

export class TextDocumentChangeListener {

    private context: vscode.ExtensionContext;
    private disposable: vscode.Disposable | undefined

    public constructor(context: vscode.ExtensionContext) {
        this.context = context;
        this.disposable = this.setupDisposables();
    }
    setupDisposables(): vscode.Disposable{
        const textDocumentChangeListener = vscode.workspace.onDidChangeTextDocument(this.onTextDocumentChange, this);
        return vscode.Disposable.from(
            textDocumentChangeListener
        );
    }

    private async onTextDocumentChange(event: vscode.TextDocumentChangeEvent): Promise<void> {
        console.log("onTextDocumentChange");
        console.log(event);
        console.log("context: " + this.context);
    }

    public dispose(): void {
        if (this.disposable) {
          this.disposable.dispose()
        }
      }

}