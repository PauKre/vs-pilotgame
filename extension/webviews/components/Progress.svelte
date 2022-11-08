<script lang="ts">
    import { onMount } from "svelte";
    import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
    let levelIcon = "🔴";
    let levelNumber = 1;
    let levelName = "Beginner";
    let currentPoints = 0;
    let maxLevelPoints = 100;
    let lastMaxPoints = 0;
    let currentMaxPointIncrease = maxLevelPoints;
    const levelIncreaseStep = 20;
    let currentPointsPercent =
        ((currentPoints * 100) / maxLevelPoints).toString() + "%";

    const progress = tweened(0, {
		duration: 2000,
		easing: cubicOut
	});

    onMount(() => {
        window.addEventListener("message", (event) => {
            const message = event.data;
            switch (message.type) {
                case "copilot-change":
                    addPoints(message.value.length);
            }
        });
    });

    function addPoints(amount: number) {
        currentPoints += amount;
        while (currentPoints >= maxLevelPoints) {
            // TODO: Animate level UP
            progress.set(1);
            levelNumber++;
            levelName = "TODO";
            levelIcon = "🟡";
            lastMaxPoints = maxLevelPoints;
            currentMaxPointIncrease += levelIncreaseStep;
            maxLevelPoints = maxLevelPoints + currentMaxPointIncrease;
        }
        currentPointsPercent =
            (
                ((currentPoints - lastMaxPoints) * 100) /
                (maxLevelPoints - lastMaxPoints)
            ).toString() + "%";
    }
</script>

<h3>Progress</h3>
<div class="statusWrapper">
    <div class="levelStatus">
        Level<br />
        {levelIcon}<br />
        {levelNumber}<br />
        {levelName}<br />
    </div>
    <div class="pointsStatus">
        Pilotpoints<br />
        <div
            class="ppprogress"
            style="--current-points: {currentPointsPercent}"
        >
            <progress value={$progress}/>
        </div>
        <br />
        {currentPoints}/{maxLevelPoints}<br />
    </div>
</div>

<style>

    .statusWrapper {
        text-align: center;
        overflow: hidden; /* will contain if #first is longer than #second */
    }
    .levelStatus {
        padding: 5px;
        float: left; /* add this */
        border: 1px solid red;
    }
    .pointsStatus {
        padding: 5px;
        border: 1px solid green;
        overflow: hidden; /* if you don't want #second to wrap below #first */
    }
</style>
