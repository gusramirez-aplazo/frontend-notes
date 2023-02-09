<script lang="ts">
	import { toastr } from '$lib/store/toastr';
	import Toastr from '$lib/ui/toastr.svelte';

	export let content: {
		title: string;
		message: string;
		type?: 'success' | 'error' | 'warning' | 'info';
		isShown?: boolean;
	};

	toastr.subscribe((toastr) => {
		if (toastr) {
			content = toastr;
		}
	});
</script>

<svelte:head>
	<style>
		:root {
			--color-gray-0: #fbfbfb;
			--color-gray-1: #f5f5f5;
			--color-gray-2: #e0e0e0;
			--color-gray-3: #bdbdbd;
			--color-gray-4: #9e9e9e;
			--color-gray-5: #757575;
			--color-gray-6: #616161;
			--color-gray-7: #424242;
			--color-gray-8: #212121;
			--color-gray-9: #000000;
			--color-blue-1: #e3f2fd;
			--color-blue-2: #bbdefb;
			--color-blue-3: #90caf9;
			--color-blue-4: #64b5f6;
			--color-blue-5: #42a5f5;
			--color-blue-6: #2196f3;
			--color-blue-7: #1e88e5;
			--color-blue-8: #1976d2;
			--color-blue-9: #1565c0;
			--color-blue-10: #0d47a1;

			--bg-color: var(--color-gray-0);
			--text-color: var(--color-gray-8);
		}

		* {
			box-sizing: border-box;
		}

		body {
			min-height: 100vh;
			margin: 0;
			-webkit-font-smoothing: antialiased;
			background-color: var(--bg-color);
			color: var(--text-color);
			font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
				'Open Sans', 'Helvetica Neue', sans-serif;
		}
		.container {
			width: min(100%, 800px);
			margin: 0 auto;
		}
	</style>
</svelte:head>

<Toastr />
<div class="container">
	<slot />
</div>
