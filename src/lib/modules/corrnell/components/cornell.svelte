<script lang="ts">
	import AddIcon from '$lib/shared/components/add-icon.svelte';
	import { Button } from 'flowbite-svelte';
	import HorizontalPanel from '../../../shared/components/horizontal-panel.svelte';

	let notes: any[] = [];
	function createOne(this: HTMLFormElement) {
		// console.log(new FormData(this).getAll('cues'));
		console.log(notes);
	}

	function addNote() {
		notes = [
			...notes,
			{
				cues: '',
				note: ''
			}
		];
	}

	function handleChangeCue(e: Event, i: number) {
		const el = e.target as HTMLTextAreaElement;
		notes[i].cues = el.value || '';
	}
	function handleChangeNote(e: Event, i: number) {
		const el = e.target as HTMLTextAreaElement;
		notes[i].note = el.value || '';
	}
</script>

<div class="flex justify-end pb-4">
	<Button pill={true} class="!p-2" on:click={addNote}>
		<AddIcon />
	</Button>
</div>
<form class="grid grid-cols-1 gap-5" on:submit|preventDefault={createOne}>
	{#each notes as note, i}
		<HorizontalPanel>
			<textarea
				class="block w-full resize-none bg-transparent border-gray-300 dark:border-gray-600"
				slot="left"
				name="cues"
				id={`cues-${i}`}
				rows="5"
				placeholder="Do you have any clues?"
				on:change={(e) => handleChangeCue(e, i)}
			/>

			<textarea
				class="block w-full resize-none bg-transparent border-gray-300 dark:border-gray-600"
				slot="right"
				name="note"
				id={`note-${i}`}
				rows="5"
				placeholder="Take your notes..."
				on:change={(e) => handleChangeNote(e, i)}
			/>
		</HorizontalPanel>
	{/each}

	<div class="flex justify-end w-full">
		<Button type="submit">Save Note</Button>
	</div>
</form>
