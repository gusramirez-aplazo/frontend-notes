<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let active = false;

	let currentColor: 'purpleToBlue' | 'dark';

	$: currentColor = active ? 'purpleToBlue' : 'dark';
</script>

<Button
	gradient={active}
	outline={!active}
	color={currentColor}
	class="capitalize"
	on:click={() => dispatch('click')}
>
	<span class="whitespace-nowrap">
		<slot />
	</span>
</Button>
