<script lang="ts">
	import { Badge } from 'flowbite-svelte';
	import type { BaseItemDetail } from '$lib/shared/entities/base-item-detail';
	import CloseIcon from '$lib/shared/components/close-icon.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let subject: BaseItemDetail;

	type color =
		| 'blue'
		| 'red'
		| 'green'
		| 'yellow'
		| 'indigo'
		| 'purple'
		| 'pink';

	const colorTable: color[] = [
		'blue',
		'red',
		'green',
		'yellow',
		'indigo',
		'purple',
		'pink'
	];

	const getColor = (name: string): color => {
		const index = name.charCodeAt(0) % colorTable.length;
		return colorTable[index];
	};
</script>

<Badge border color={getColor(subject.name)}>
	<p class="truncate text-base py-1">
		{subject.name}
	</p>

	<button
		on:click={() => dispatch('close')}
		type="button"
		class="inline-flex items-center ml-2 text-base bg-transparent rounded-sm text-blue-200 hover:bg-blue-100 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300"
		aria-label="Remove"
	>
		<CloseIcon />
	</button>
</Badge>
