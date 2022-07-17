<script>
	import socket from '$lib/socket';
	import { goto } from '$app/navigation';

	import NavBar from '../../components/navbar.svelte';

	const createSession = () => {
		socket.emit('create session');
		socket.on('create session', (session) => {
			goto(`/therapist/session/${session.sessionId}`);
		});
	};
</script>

<svelte:head>
	<title>Therapist - Create Session</title>
</svelte:head>
<main>
	<NavBar goBack={true} goBackLink="/" />
	<div class="flex flex-col items-center pt-52 px-10 h-screen">
		<div class="flex flex-col gap-10">
			<div class="flex flex-col gap-5">
				<h2 class="text-3xl">Welcome, Therapist</h2>
				<h4 class="text-lg w-3/4">
					Your are one step away from creating a new session. click the create session button to
					continue
				</h4>
			</div>
			<button on:click={createSession} class="btn btn-dark">Create a new session</button>
		</div>
	</div>
</main>
