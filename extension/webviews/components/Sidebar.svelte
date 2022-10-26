<script lang="ts">
    import { onMount } from "svelte";
    import type { User } from "../types";
    import Todos from "./Todos.svelte";

    let page: "todos" | "contact" = tsvscode.getState()?.page || "todos";

    $: {
        tsvscode.setState({ page });
    }
</script>

<h1>Hi!</h1>


    
    
