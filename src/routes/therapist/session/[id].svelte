<script>
	import CopyToClipboard from 'svelte-copy-to-clipboard';

	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import socket from '$lib/socket';
	import { page } from '$app/stores';

	//icons
	import TiArrowLeftThick from 'svelte-icons/ti/TiArrowLeftThick.svelte';
	import IoMdClipboard from 'svelte-icons/io/IoMdClipboard.svelte';

	const sessionId = $page.params.id;

	let sessionValue;
	let bgColor;
	let speed;
	let link = 'http://localhost:3000/client/session/' + sessionId;
	let counter = 0;

	$: animationSpeed = 11 - speed + 's';

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
	};

	onMount(() => getSession());

	const toggleBouncing = (config) => {
		const newConfig = { ...config, isBouncing: !config.isBouncing };
		socket.emit('set config', { sessionId: sessionId, config: newConfig });
		getSession();
	};

	const changeColor = (config) => {
		const newConfig = { ...config, bgColor: bgColor };
		socket.emit('set config', { sessionId: sessionId, config: newConfig });
		getSession();
	};

	const changeSpeed = (config) => {
		const newConfig = { ...config, speed: speed };
		socket.emit('set config', { sessionId: sessionId, config: newConfig });
		getSession();
	};

	const terminateSession = () => {
		sessionStore.set(null);
		goto('/therapist/');
	};

	const handleSuccessfullyCopied = (e) => {
		alert('Copied');
	};

	const handleFailedCopy = () => {
		alert('failed to copy :(');
	};
</script>

<svelte:head>
	<title>Therapist - Session</title>
</svelte:head>

<div>
	{#if sessionValue}
		<div class="navbar bg-base-100 shadow">
			<div class="flex-1 pl-5">
				<a href="/therapist" class="btn w-12 text-white h-12 bg-gray-700 rounded-full p-2">
					<TiArrowLeftThick />
				</a>
			</div>
			<div class="flex-none" />
		</div>

		<main
			class="w-full h-64 flex items-center {sessionValue.config.isBouncing
				? ''
				: 'justify-center'} bg-gray-1000"
			style="--bg-color: {sessionValue.config.bgColor}; --animation-speed:{animationSpeed};"
		>
			<div class="{sessionValue.config.isBouncing ? 'bounce' : ''} ball w-20 h-20 rounded-full" />
		</main>
		<div class="w-full h-full p-10 rounded-tl-2xl rounded-tr-2xl bg-base-200">
			<div class="flex flex-row gap-28 justify-evenly">
				<div class="flex flex-col gap-2">
					<label class="label-text"> Start/Stop </label>
					<input
						type="checkbox"
						class="toggle"
						checked={sessionValue.config.isBouncing ? true : false}
						on:change={() => toggleBouncing(sessionValue.config)}
					/>
					<br />
					<label class="label-text"> Change Color </label>
					<input
						type="color"
						class="w-28 h-10 rounded-xl"
						bind:value={bgColor}
						on:change={() => changeColor(sessionValue.config)}
					/>
				</div>
				<div>
					<p>Set Speed</p>
					<input
						type="range"
						min="1"
						max="10"
						class="range range-accent"
						bind:value={speed}
						on:change={() => changeSpeed(sessionValue.config)}
					/>
				</div>
			</div>
			<div class="flex flex-col items-center gap-10 justify-center mt-10">
				<div class="flex flex-row justify-between items-center border-2 gap-2 input w-2/5">
					<p>{link}</p>
					<CopyToClipboard
						text={link}
						let:copy
						on:copy={handleSuccessfullyCopied}
						on:fail={handleFailedCopy}
					>
						<button class="text-gray-600 w-8 h-8" on:click={copy}>
							<IoMdClipboard />
						</button>
					</CopyToClipboard>
				</div>

				<button on:click={terminateSession} class="btn btn-dark mb-20">Terminate</button>
			</div>
		</div>
	{:else}
		<div class="flex flex-col items-center justify-center w-screen h-screen">
			<p>Loading...</p>
		</div>
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
