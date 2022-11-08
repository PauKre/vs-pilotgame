<script lang="ts">
    import { onMount } from "svelte";
    import Progress from "./Progress.svelte";
    import Upload from "./Upload.svelte";

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
<Upload/>

<!-- <h1>Hi Pilot!</h1>
<p>Last CoPilot change: 
    {lastChange}
</p> -->
