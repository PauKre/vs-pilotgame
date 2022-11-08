<script>
	import { fade, fly } from 'svelte/transition';
	let barWidth = 0;
	let progress; // for setInterval
	let isActive = false;	
	let chooseFileBtn; // use with bind:this and the input type="file"
	
	$: if (barWidth === 100) {
		stopProgress();
		setTimeout(resetBar, 2500);
	}
	
	const stopProgress = () => {
		clearInterval(progress);
		isActive = false;
		chooseFileBtn.value = "";
	}
	
	const resetBar = () => {
		stopProgress();
		barWidth = 0;
	}

	const addColor = () => barWidth += 1;
	
	const randomTime = () => Math.floor(Math.random() * 60)
	
	const makeProgress = () => {
		if (!chooseFileBtn.value) {
			alert("Choose a file")
		} else {
			isActive = true;
			progress = setInterval(addColor, randomTime());		
		}
	}	
</script>


<style>	
	#myProgress {
		width: 100%;
		height: 50px;
		position: relative;
		margin-top: 5%;
	}

	span {
		position: absolute;
		left: 46%;
		top: 10%;
		font-size: 1.2rem;
	}	
	
	#myBar {
		height: 30px;
		background-color: hsl(102, 27%, 60%);	
		border: 1px solid #333;
	}
	
	form {
		margin-top: 1%;
		width: 100%;
		text-align: center;
	}	
	
	button {
		cursor: pointer;
		width: 100px;
		padding: 9.5px 0;
	}
	
	button:active {
		background-color: hsl(204, 58%, 55%);
		color: white;
	}
	
	@keyframes blink {
		to { opacity: 0 }
	}
	
	#complete-msg-cont {
		height: 50px;
		padding: 10px;
	}
	
	h3#complete-msg {
		margin: 0;
		text-align: center;
		animation: blink .5s ease-in-out 3;
	}
</style>


<div id="complete-msg-cont">
	{#if barWidth === 100}
	<h3 id="complete-msg" in:fly={{x: -300}} out:fly={{x: 300}}>
		Your file has been uploaded!
	</h3>
	{/if}
</div>

<div id="myProgress">
	{#if isActive}
		<span>{barWidth}%</span>
		<div id="myBar" style="width: {barWidth}%"></div>
	{/if}
</div>

<form on:submit|preventDefault={makeProgress}>
	<input type="file" id="myFile" name="filename" bind:this={chooseFileBtn}>
	<button disabled={isActive}>Upload File</button>
	<button on:click|stopPropagation|preventDefault={resetBar}>Cancel</button>
</form>