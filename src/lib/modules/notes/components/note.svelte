<script lang="ts">
	import HorizontalPanel from '$lib/shared/components/horizontal-panel.svelte';

	import type { FormControl } from '$lib/shared/entities/form-control';
	import type { Note } from '../entities';
	import { Button, Helper } from 'flowbite-svelte';
	import RemoveIcon from '$lib/shared/components/remove-icon.svelte';

	export let formControl: FormControl<Note[]>;

	function removeNote(note: Note) {
		formControl.value = formControl.value.filter((n) => n.id !== note.id);
	}

	function setCue(event: Event, note: Note) {
		const el = event.target as HTMLTextAreaElement;
		note.cue = el?.value?.trim() || '';
		const refNote = formControl.value.find((n) => n.id === note.id);

		if (refNote) {
			refNote.cue = note.cue;
		}
	}

	function setContent(event: Event, note: Note) {
		const el = event.target as HTMLTextAreaElement;
		note.content = el?.value?.trim() || '';
		const refNote = formControl.value.find((n) => n.id === note.id);

		if (refNote) {
			refNote.content = note.content;
		}
	}
</script>

<div
	class={formControl.isTouched && !formControl.isValid
		? 'flex flex-col gap-10 w-full p-3 border border-red-500 rounded-md empty:hidden'
		: 'flex flex-col gap-10 w-full p-3 border border-slate-200 rounded-md empty:hidden'}
>
	{#each formControl.value as note}
		<div class="flex w-full relative">
			<Button
				outline
				class="!p-2 absolute top-[-0.5rem] right-[-0.5rem] hover:!bg-red-500"
				color="dark"
				on:click={() => removeNote(note)}
			>
				<RemoveIcon />
			</Button>
			<HorizontalPanel>
				<textarea
					class="
					block
					w-full
					resize-none
					outline-none
					focus:ring-transparent
					focus:outline-blue-500
					border-none
					rounded-sm
					dark:bg-slate-900
					bg-slate-100
				"
					slot="left"
					name="cue"
					id={`cue-${note.id}`}
					rows="8"
					placeholder="Do you have any clues?"
					on:change={(e) => setCue(e, note)}
				/>

				<textarea
					class="
					block
					w-full
					resize-none
					outline-none
					focus:ring-transparent
					focus:outline-blue-500
					border-none
					rounded-sm
					dark:bg-slate-900
					bg-slate-100
					"
					slot="right"
					name="note"
					id={`note-${note.id}`}
					rows="8"
					placeholder="Take your notes..."
					on:change={(e) => setContent(e, note)}
				/>
			</HorizontalPanel>
		</div>
	{/each}
</div>
{#if formControl.value.length && formControl.isTouched && formControl.errors}
	<Helper class="mt-0" color="red">Some content within a note are empty</Helper>
{:else if !formControl.value.length}
	<div class="flex justify-center">
		<h3 class="text-red-500">Notes are required</h3>
	</div>
{/if}
