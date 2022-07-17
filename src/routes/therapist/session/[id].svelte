<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import socket from '$lib/socket';
	import { page } from '$app/stores';

	const sessionId = $page.params.id;

	let sessionValue;
	let bgColor;
	let speed;
	let counter = 0;
	$: animationSpeed = (11 - speed) + 's';

	const getSession = () => {
		socket.emit('get session', sessionId);
		socket.on('get session', (session) => {
			if (session) {
				sessionValue = session;
				bgColor = session.config.bgColor;
				speed = session.config.speed;
			} else {
				goto('/therapist');
			}
		});
	}

	onMount(() => getSession());

	const toggleBouncing = (config) => {
		const newConfig = {...config, isBouncing: !config.isBouncing}
		socket.emit('set config', { sessionId: sessionId, config: newConfig });
		getSession();	
	};

	const changeColor = (config) => {
		const newConfig = {...config, bgColor: bgColor};
		socket.emit('set config', { sessionId: sessionId, config: newConfig });
		getSession();	
	};

	const changeSpeed = (config) => {
		const newConfig = {...config, speed: speed};
		socket.emit('set config', { sessionId: sessionId, config: newConfig });
		getSession();	
	}
	
	const terminateSession = () => {
		sessionStore.set(null);
		goto('/therapist/');
	};
</script>

<div>
	{#if sessionValue}
		<main
			class="w-full h-52 flex items-center {sessionValue.config.isBouncing
				? ''
				: 'justify-center'} bg-gray-1000"
			style="--bg-color: {sessionValue.config.bgColor}; --animation-speed:{animationSpeed};"
		>
			<div class="{sessionValue.config.isBouncing ? 'bounce' : ''} ball w-20 h-20 rounded-full" />
		</main>
		<p>Start/Stop</p>
		<button
			type="submit"
			on:click={() => toggleBouncing(sessionValue.config)}
			class="bg-green-300">{sessionValue.config.isBouncing ? 'Stop' : 'Start'}</button
		>
		<p>Change Color</p>
		<input type="color" bind:value={bgColor} on:change={() => changeColor(sessionValue.config)}  />
		<p>Set Speed</p>
		<div class="flex flex-row gap-4">
			<input type="range" min="1" max="10" bind:value={speed} on:change={() => changeSpeed(sessionValue.config)} />
		</div>
		<p>Share link: {`http://localhost:3000/client/session/${sessionId}`} <em>Copy</em></p>

		
		<button on:click={terminateSession}>Terminate</button>
	{:else}
		<p>Loading...</p>
	{/if}
</div>

<style>
	.ball {
		background: radial-gradient(circle at 30% 30%, var(--bg-color), #33230f);
	}
	.bounce {
		animation: bounce;
		animation-duration: var(--animation-speed);
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
