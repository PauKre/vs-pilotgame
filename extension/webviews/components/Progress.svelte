<script lang="ts">
    import { onMount } from "svelte";
    import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
    import { writable } from "svelte/store";
    let levelIcon = "🔴";
    let levelNumber = 1;
    let levelName = "Beginner";
    let currentPoints = 0;
    let maxLevelPoints = 100;
    let lastMaxPoints = 0;
    let currentMaxPointIncrease = maxLevelPoints;
    const levelIncreaseStep = 20;
    let currentPointsPercent =
        (currentPoints * 100) / maxLevelPoints;

    const animationDuration = 1000;
        const progress = tweened(0, {
		duration: animationDuration,
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
        if(currentPoints<maxLevelPoints){
            currentPointsPercent =((currentPoints - lastMaxPoints)) / (maxLevelPoints - lastMaxPoints);
            progress.set(currentPointsPercent);
            return;
        }
        while (currentPoints >= maxLevelPoints) {
            levelNumber++;
            levelName = "TODO";
            levelIcon = "🟡";
            lastMaxPoints = maxLevelPoints;
            currentMaxPointIncrease += levelIncreaseStep;
            maxLevelPoints = maxLevelPoints + currentMaxPointIncrease;
            progress.set(1);
            new Promise((resolve) => setTimeout(resolve, animationDuration)).then(() => {
                progress.set(0, {duration: 0});
                currentPointsPercent =((currentPoints - lastMaxPoints)) / (maxLevelPoints - lastMaxPoints);
                progress.set(currentPointsPercent);

            });
        }
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
        Pilotpoints<br/>
        {currentPointsPercent}<br/>
        <div>
            <progress value={$progress}/>
        </div>
        {currentPoints}/{maxLevelPoints}<br />
    </div>
</div>

<style>

    h3{
        font-size: 25px;
    }

    progress{
        width: 200px;
        height: 20px;
    }

    .statusWrapper {
        text-align: center;
        overflow: hidden; /* will contain if #first is longer than #second */
    }
    .levelStatus {
        width: 80px;
        padding: 5px;
        float: left; /* add this */
    }
    .pointsStatus {
        padding: 5px;
        overflow: hidden; /* if you don't want #second to wrap below #first */
    }
</style>
