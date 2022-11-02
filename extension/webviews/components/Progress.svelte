<script lang="ts">
    import { onMount } from "svelte";
    let levelIcon = "🔴";
    let levelNumber = 1;
    let levelName = "Beginner";
    let currentPoints = 0;
    let maxLevelPoints = 100;

    onMount(() => {
        window.addEventListener("message", (event) => {
            const message = event.data;
            switch (message.type) {
                case "copilot-change":
                    currentPoints += message.value.length;
            }
        });
    });
</script>

<h3>Progress</h3>
<div class="statusWrapper" />
<div class="levelStatus">
    Level<br />
    {levelIcon}<br />
    {levelNumber}<br />
    {levelName}<br />
</div>
<div class="pointsStatus">
    Pilotpoints<br />
    <progress value="30" max="100" /><br />
    {currentPoints}/{maxLevelPoints}<br />
</div>

<style>
    .statusWrapper {
        text-align: center;
        border: 1px solid black;
        overflow: hidden; /* will contain if #first is longer than #second */
    }
    .levelStatus {
        float: left; /* add this */
        border: 1px solid red;
    }
    .pointsStatus {
        border: 1px solid green;
        overflow: hidden; /* if you don't want #second to wrap below #first */
    }
</style>
