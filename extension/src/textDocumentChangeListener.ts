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
        if(event.contentChanges.length != 1) {
            return;
        }
        let text = event.contentChanges[0].text;
        text = text.replace('\t', '');
        text = text.replace('\r\n', '');
        if (text.includes(' ') && text.length > 5) {
            text = text.replace(/\s/g, "");
            this.sidebarProvider._view?.webview.postMessage({ type: 'copilot-change', value: text, });
        }
    }

    public dispose(): void {
        if (this.disposable) {
            this.disposable.dispose()
        }
    }

}