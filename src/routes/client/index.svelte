<script>
	import NavBar from '../../components/navbar.svelte';

	import { goto } from '$app/navigation';
	import socket from '$lib/socket';

	let sessionId;

	const joinSession = () => {
		socket.emit('get session', sessionId);
		socket.on('get session', (session) => {
			if (session) {
				goto('/client/session/' + session.sessionId);
			} else {
				alert("session doesn't exist");
			}
		});
	};
</script>

<svelte:head>
	<title>Client - Join Session</title>
</svelte:head>
<main>
	<NavBar goBack={true} goBackLink="/" />
	<div class="flex flex-col items-center pt-52 px-10 h-screen">
		<div class="flex flex-col gap-10 lg:pl-72">
			<div class="flex flex-col gap-5">
				<h2 class="text-3xl">Welcome, Client</h2>
				<h4 class="text-lg w-3/4">
					Your are one step away from joing your session. paste down blow the session code the
					therpais gave you
				</h4>
			</div>
			<div class="flex flex-row w-3/4">
					<input
						type="text"
						placeholder="Enter session id"
						class="input input-bordered w-full rounded-tr-none rounded-br-none"
						bind:value={sessionId}
					/>
				<button
					class="btn btn-dark rounded-tl-none rounded-bl-none"
					type="submit"
					disabled={sessionId ? false : true}
					on:click={joinSession}>Join</button
				>
			</div>
		</div>
	</div>
</main>
