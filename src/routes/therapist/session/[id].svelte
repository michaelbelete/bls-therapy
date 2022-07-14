<script>
	let isBouncing = false;
	const toggleBouncing = () => {
		isBouncing = !isBouncing;
	};

	let bgColor = '#ef4444';
	let speed = 2;
	$: animationSpeed = (10.5-speed) + 's';

	$: console.log(animationSpeed)
</script>

<div>
	<main class="w-full h-52 flex items-center {isBouncing ? '' : 'justify-center'} bg-gray-1000" style="--bg-color: {bgColor}; --animation-speed:{animationSpeed}">
		<div
			class="{isBouncing ? 'bounce' : ''} ball w-20 h-20 rounded-full"
		/>
	</main>
	<p>Start/Stop</p>
	<button type="submit" on:click={toggleBouncing} class="bg-green-300"
		>{isBouncing ? 'Stop' : 'Start'}</button
	>
	<p>Change Color</p>
	<input type="color" bind:value={bgColor} />
	<p>Set Speed</p>
	<div class="flex flex-row gap-4">
		<input type="range" bind:value={speed} min="1" max="10" />
	</div>
	<p>Share link: http://www.blm.io/session</p>
</div>

<style>
	.ball {
		animation: bounce;
		animation-duration: var(--animation-speed);
		background: radial-gradient(circle at 30% 30%, var(--bg-color), #774400);
	}
	.bounce {
		animation-direction: alternate;
		animation-timing-function: cubic-bezier(0.5, 0.5, 0.5, 0.5);
		animation-iteration-count: infinite;
	}

	@keyframes bounce {
		from {
			transform: translate3d(0, 0, 0);
		}
		to {
			transform: translate3d(95vw, 0, 0);
		}
	}

	/* Prefix Support */
	ball {
		-webkit-animation-name: bounce;
		-webkit-animation-duration: 0.5s;
		-webkit-animation-direction: alternate;
		-webkit-animation-timing-function: cubic-bezier(0.5, 0.05, 1, 0.5);
		-webkit-animation-iteration-count: infinite;
	}

	@-webkit-keyframes bounce {
		from {
			-webkit-transform: translate3d(0, 0, 0);
			transform: translate3d(0, 0, 0);
		}
		to {
			-webkit-transform: translate3d(0, 200px, 0);
			transform: translate3d(0, 200px, 0);
		}
	}
</style>
