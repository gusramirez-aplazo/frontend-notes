<script lang="ts">
	import { subjects } from '$lib/modules/subject/store/subjects';
	import CloseIcon from '$lib/shared/components/close-icon.svelte';
	import { Badge } from 'flowbite-svelte';
	import type { SubjectStore } from '../entities';

	let componentSubjects: SubjectStore;

	subjects.subscribe((value) => {
		componentSubjects = value;
	});

	$: console.log(componentSubjects);

	const handleHide = () => {
		console.log('hide');
	};
</script>

<div
	class="flex flex-row w-full overflow-x-auto py-4 px-2 mt-8 mb-6 rounded-lg border-gray-500 border border-solid"
>
	<Badge large border color="green">
		button

		<button
			on:click={handleHide}
			type="button"
			class="inline-flex items-center p-0.5 ml-2 text-sm bg-transparent rounded-sm text-blue-400 hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300"
			aria-label="Remove"
		>
			<CloseIcon />
		</button>
	</Badge>
	<Badge large border color="green">
		button

		<button
			on:click={handleHide}
			type="button"
			class="inline-flex items-center p-0.5 ml-2 text-sm bg-transparent rounded-sm text-blue-400 hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300"
			aria-label="Remove"
		>
			<CloseIcon />
		</button>
	</Badge>
	<Badge large border color="green">
		button

		<button
			on:click={handleHide}
			type="button"
			class="inline-flex items-center p-0.5 ml-2 text-sm bg-transparent rounded-sm text-blue-400 hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300"
			aria-label="Remove"
		>
			<CloseIcon />
		</button>
	</Badge>
	<Badge large border color="green">
		button

		<button
			on:click={handleHide}
			type="button"
			class="inline-flex items-center p-0.5 ml-2 text-sm bg-transparent rounded-sm text-blue-400 hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300"
			aria-label="Remove"
		>
			<CloseIcon />
		</button>
	</Badge>
</div>
<h1>subjects</h1>
