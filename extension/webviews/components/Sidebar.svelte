<script lang="ts">
    import { onMount } from "svelte";

    let page: "todos" | "contact" = tsvscode.getState()?.page || "todos";

    $: {
        tsvscode.setState({ page });
    }
</script>

<h1>Hi!</h1>


    
    
