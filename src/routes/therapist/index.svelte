<script>
	import socket from '$lib/socket';
	import { goto } from '$app/navigation';
	import { sessionStore } from '../../store/session';
	import sessionValue from '$lib/getSessionValue';

	const createSession = () => {
		socket.emit('create session');
		socket.on('create session', (session) => {
			sessionStore.set(session);
      goto(`/therapist/session/${session.sessionId}`);
		});
	};

</script>

<svelte:head>
	<title>Therapist - Create Session</title>
</svelte:head>

<h1>Create session</h1>
<button on:click={createSession} class="bg-red-800 px-10 py-10 rounded-full">Create</button>
