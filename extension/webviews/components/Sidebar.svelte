<script lang="ts">
    import { onMount } from "svelte";

    let page: "todos" | "contact" = tsvscode.getState()?.page || "todos";
    let counter = 0;

    $: {
        tsvscode.setState({ page });
    }
</script>

<h1>Hi!</h1>
<p>You've used Copilot {counter} times</p>


    
    
