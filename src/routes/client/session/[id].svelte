<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import socket from '$lib/socket';
	import { page } from '$app/stores';

	const sessionId = $page.params.id;

	let sessionValue;
	let bgColor;
	let speed;
	$: animationSpeed = 10.5 - speed + 's';

	const getSession = () => {
		socket.emit('get session', sessionId);
		socket.on('get session', (session) => {
			if (session) {
				sessionValue = session;
				bgColor = session.config.bgColor;
				speed = session.config.speed;
			} else {
				goto('/client');
			}
		});

		socket.on('terminate session', () => {
			goto('/client/');
		});
	};

	onMount(() => getSession());
</script>

<div>
	{#if sessionValue}
		<div>
			{#if !sessionValue.config.isBouncing}
				<div class="alert alert-info rounded-none shadow-lg">
					<div>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							class="stroke-current flex-shrink-0 w-6 h-6"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/></svg
						>
						<span>Waiting for the therapist to start...</span>
					</div>
				</div>
			{/if}
		</div>
		<main
			class="w-screen h-screen flex flex-row align-middle items-center {sessionValue.config
				.isBouncing
				? ''
				: 'justify-center'} bg-gray-1000"
			style="--bg-color: {sessionValue.config.bgColor}; --animation-speed:{animationSpeed};"
		>
			<div class="{sessionValue.config.isBouncing ? 'bounce' : ''} ball w-20 h-20 rounded-full" />
		</main>
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
