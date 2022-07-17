<script>
    import socket from "$lib/socket";

    socket.on("connect", function(socket) {
        console.log("socket connected");
    });
</script>
<main class="text-lg border flex flex-col gap-2">
    <a href="/client">Client</a>
    <a href="/therapist">therapist</a>
</main>