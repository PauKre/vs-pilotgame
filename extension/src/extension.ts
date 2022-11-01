import * as vscode from "vscode";
import { SidebarProvider } from "./SidebarProvider";
import { TokenManager } from "./TokenManager";
import { TextDocumentChangeListener } from "./textDocumentChangeListener";

let tdcl: TextDocumentChangeListener | undefined = undefined

export function activate(context: vscode.ExtensionContext) {

  const sidebarProvider = new SidebarProvider(context.extensionUri);
  tdcl = new TextDocumentChangeListener(context, sidebarProvider);
  context.subscriptions.push(tdcl);

  var copilotExtension = vscode.extensions.getExtension('GitHub.copilot');

  printExtensionInfo(copilotExtension);
  // is the ext loaded and ready ?
    copilotExtension?.activate().then(
      function () {
        console.log("Extension activated");
        // comment next line out for release
        // findCommand(); 
        // vscode.commands.executeCommand("github.copilot.generate");
      },
      function () {
        console.log("Extension activation failed");
      }
    );
  // printExtensionInfo(copilotExtension);

  TokenManager.globalState = context.globalState;

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

function printExtensionInfo(xmlExtension: vscode.Extension<any> | undefined) {
  if (xmlExtension) {
    console.log("Extension found");
    console.log("Extension id: " + xmlExtension.id);
    console.log("Extension isActive: " + xmlExtension.isActive);
    console.log("Extension packageJSON: " + xmlExtension.packageJSON);
  } else {
    console.log("Extension not found");
  }
}

