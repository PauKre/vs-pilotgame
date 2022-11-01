import * as vscode from 'vscode'
import { createEventDispatcher } from 'svelte'
import { SidebarProvider } from './SidebarProvider';

export class TextDocumentChangeListener {

    private context: vscode.ExtensionContext;
    private disposable: vscode.Disposable | undefined
    private sidebarProvider: SidebarProvider;


    public constructor(context: vscode.ExtensionContext, sidebarProvider: SidebarProvider) {
        this.sidebarProvider = sidebarProvider;
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
        if (text.includes(" ") && text.length > 10) {
            console.log("copilot was triggered");
            this.sidebarProvider._view?.webview.postMessage({ type: 'copilot-change', value: text, });
        }
    }

    public dispose(): void {
        if (this.disposable) {
            this.disposable.dispose()
        }
    }

}