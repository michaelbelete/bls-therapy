<script>
	let isBouncing = false;
	const toggleBouncing = () => {
		isBouncing = !isBouncing;
	};

	let color = '#ef4444';
	let speed = 2;
    let animationSpeed = speed+'s';

	function setCssVariables(node, variables) {
		for (const name in variables) {
			node.style.setProperty(`--${name}`, variables[name]);
		}
	}

	function cssVariables(node, variables) {
		setCssVariables(node, variables);

		return {
			update(variables) {
				setCssVariables(node, variables);
			}
		};
	}

    const decreaseSpeed = () => {
        speed-=0.5;
        animationSpeed = (10.5-speed)+'s';
    };

    const increaseSpeed = () => {
        speed+=0.5;
        animationSpeed = (10.5-speed)+'s';
    };

</script>

<div>
	<main class="w-full h-52 flex items-center {isBouncing ? '' : 'justify-center'} bg-gray-1000 ">
		<div
			class="{isBouncing ? 'ball' : ''} w-20 h-20 rounded-full bg-red-500"
            use:cssVariables={{color, animationSpeed}}
		/>
	</main>
	<p>Start/Stop</p>
	<button type="submit" on:click={toggleBouncing} class="bg-red-300"
		>{isBouncing ? 'Start' : 'Stop'}</button
	>
	<p>Change Color</p>
	<input type="color" bind:value={color} />
	<p>Set Speed</p>
    <div class="flex flex-row gap-4">
        <button type="submit" on:click={decreaseSpeed}  class="bg-red-700 px-4 py-2 disabled:bg-gray-700" disabled={speed == 0.5}>-</button>
        <p class="text-lg py-2">{speed}</p>
        <button type="submit" on:click={increaseSpeed}  class="bg-blue-700 px-4 py-2 disabled:bg-gray-700" disabled={speed == 10}>+</button>
    </div>
    <p>Share link: http://www.blm.io/session</p>
</div>

<style>
	.ball {
		animation: bounce var(--animationSpeed);
        background-color: var(--color);
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
