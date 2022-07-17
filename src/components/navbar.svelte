<script>
	import TiArrowLeftThick from 'svelte-icons/ti/TiArrowLeftThick.svelte';

	export let goBack = false;
	export let goBackLink = null;
</script>

<div class="navbar bg-base-100 shadow">
	<div class="flex-1 pl-5">
		{#if goBack}
			<a href={goBackLink} class="btn w-12 text-white h-12 bg-gray-700 rounded-full p-2">
				<TiArrowLeftThick />
			</a>
		{:else}
            <h2>BLS Therapy</h2>
        {/if}
	</div>
	<div class="flex-none" />
</div>
