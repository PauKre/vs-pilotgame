<script lang="ts">
    import { onMount } from "svelte";
    import UsageCounter from "./UsageCounter.svelte";

    // let page: "todos" | "contact" = tsvscode.getState()?.page || "todos";
    // let counter = 0;

    // $: {
    //     tsvscode.setState({ page });
    // }
    let test = "";
    function handleMessage(event: { detail: { text: string } }) {
        test = "Test";
    }

    onMount(() => {
        window.addEventListener("message", (event) => {
            const message = event.data;
            switch (message.type) {
                case "copilot-change":
                    test="Please work";
            }
        });
    });
</script>

<h1>Hi Pilot!</h1>
<UsageCounter on:mesdefsage={handleMessage} />
<button
    on:click={() => tsvscode.postMessage({ type: "onInfo", value: "get lost" })}
>
    Click me
</button>
<p>{test}</p>
