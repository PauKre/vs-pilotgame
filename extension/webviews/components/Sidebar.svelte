<script lang="ts">
    import { onMount } from "svelte";
    import Progress from "./Progress.svelte";
    import Challenges from "./Challenges.svelte";

    let lastChange = "";

    onMount(() => {
        window.addEventListener("message", (event) => {
            const message = event.data;
            switch (message.type) {
                case "copilot-change":
                    lastChange=message.value;
            }
        });
    }); 
</script>

<Progress/>
<Challenges/>
