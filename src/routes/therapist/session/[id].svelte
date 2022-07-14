<script>
    const startBounce = () => {
        console.log('bounce')
    };
</script>

<main class="w-full h-52 flex items-center justify-center bg-gray-200 ">
	<div class="w-20 h-20 bg-red-500 rounded-full" />
</main>
<button type=submit on:click={startBounce} class="w-full bg-blue-500 rounded-xl py-3 text-2xl text-white"> start </button>

