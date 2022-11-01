import * as vscode from "vscode";
import { SidebarProvider } from "./SidebarProvider";
import { TextDocumentChangeListener } from "./textDocumentChangeListener";

let tdcl: TextDocumentChangeListener | undefined = undefined

export function activate(context: vscode.ExtensionContext) {

  const sidebarProvider = new SidebarProvider(context.extensionUri);
  tdcl = new TextDocumentChangeListener(context, sidebarProvider);
  context.subscriptions.push(tdcl);

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider("pilotgame-sidebar", sidebarProvider)
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("vstodo.refresh", async () => {
      await vscode.commands.executeCommand("workbench.action.closeSidebar");
      await vscode.commands.executeCommand(
        "workbench.view.extension.pilotgame-sidebar-view"
      );
    })
  );


}

export function deactivate() { }

