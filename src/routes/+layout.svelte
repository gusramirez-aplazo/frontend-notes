<script>
	import Toastr from '$lib/modules/notifier/components/toastr.svelte';
	import { DarkMode, Navbar, NavBrand } from 'flowbite-svelte';
	import '../app.css';
</script>

<Toastr />
<Navbar>
	<NavBrand href="/">
		<span class="self-center"> home </span>
	</NavBrand>

	<DarkMode />
</Navbar>
<div class="container max-w-lg mx-auto">
	<slot />
</div>
