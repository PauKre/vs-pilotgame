<script>
    import { tweened } from "svelte/motion";
    import { cubicOut } from "svelte/easing";
    import { onMount } from "svelte";
    let ChallengeName = "Beginner Pilot";
    let ChallengeDescription = "Make 20 completions";
    let challengeProgress = 0;
    let challengeGoal = 20;
    let animationDuration = 2000;
    const progress = tweened(0, {
        duration: animationDuration,
        easing: cubicOut,
    });

    onMount(() => {
        window.addEventListener("message", (event) => {
            const message = event.data;
            switch (message.type) {
                case "copilot-change":
                    challengeProgress++;
                    progress.set(challengeProgress / challengeGoal);
            }
        });
    });


</script>

<div class="statusWrapper">
    <div class="challengeText">
        <p id="heading">{ChallengeName}</p>
        {ChallengeDescription}<br />
    </div>
    <div class="challengeStatus">
        <div>
            <progress value={$progress} />
        </div>
        {challengeProgress}/{challengeGoal}<br />
    </div>
</div>

<style>

    #heading {
        font-weight: bold;
    }

    progress {
        width: 200px;
        height: 15px;
    }

    .statusWrapper {
        text-align: center;
        overflow: hidden; /* will contain if #first is longer than #second */
    }
    .challengeText {
        width: 120px;
        padding: 5px;
        float: left; /* add this */
    }
    .challengeStatus {
        padding: 5px;
        overflow: hidden; /* if you don't want #second to wrap below #first */
    }
</style>
