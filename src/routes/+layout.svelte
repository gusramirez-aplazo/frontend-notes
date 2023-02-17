<script>
	import Toastr from '$lib/modules/notifier/components/toastr.svelte';
	import '../app.css';
</script>

<div class="container max-w-lg mx-auto">
	<Toastr />
	<slot />
</div>
