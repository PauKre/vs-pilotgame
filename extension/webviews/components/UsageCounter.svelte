<script>
    import { createEventDispatcher } from "svelte";



    let counter = 5;

    //     webviewPanel.webview.onDidReceiveMessage(e => {
    //     switch (e.type) {
    //         case 'onTextDocumentChange':
    //             vscode.window.showInformationMessage("Hello World!");
    //             counter++;
    //         return;
    //     }
    const dispatch = createEventDispatcher();

    function sendMessage() {
        dispatch("message", {
            text: "Hello World!",
        });
    }

    // });
</script>

<p>You've used Copilot {counter} times</p>
