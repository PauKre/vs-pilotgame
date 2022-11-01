<script lang="ts">
    import { onMount } from "svelte";
    import Progress from "./Progress.svelte";

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

<!-- <h1>Hi Pilot!</h1>
<p>Last CoPilot change: 
    {lastChange}
</p> -->
