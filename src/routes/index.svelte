<script>
	import NavBar from '../components/navbar.svelte';
</script>

<svelte:head>
	<title>Therapist - Create Session</title>
</svelte:head>
<main>
	<NavBar/>
	<div class="flex flex-col items-center pt-52 px-10 h-screen">
		<div class="flex flex-col gap-10">
			<div class="flex flex-col gap-5">
				<h2 class="text-3xl">Welcome to <b>BLS Therapy</b></h2>
				<h4 class="text-lg w-3/4">
					Your are one step away from creating a new session. click the create session button to
					continue
				</h4>
			</div>
            <div class="flex flex-row justify-center gap-10 px-3">
                <a href="/therapist" class="btn btn-dark w-1/2">Therapist</a>
                <a href="/client" class="btn btn-outline btn-dark w-1/2">Client</a>
            </div>
		</div>
	</div>
</main>
