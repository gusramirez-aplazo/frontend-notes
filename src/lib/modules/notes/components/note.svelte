<script lang="ts">
	import HorizontalPanel from '$lib/shared/components/horizontal-panel.svelte';
	import RemoveIcon from '$lib/shared/components/remove-icon.svelte';

	import { Button, Helper } from 'flowbite-svelte';
	import { notifierService } from '$lib/modules/notifier/services/tostr-store.service';

	import type { Note } from '../entities';
	import type { FormArray } from '$lib/shared/entities/form-array';

	export let formArray: FormArray<Note>;

	function removeNote(note: Note) {
		if (formArray.value.length <= 1) {
			notifierService.warning(
				"You can't remove the last note",
				'Notes must have at least one note'
			);
			return;
		}
		formArray.value = formArray.value.filter((n) => n.value.id !== note.id);
	}
</script>

{#each formArray.value as note}
	<div
		class={note.isTouched && !note.isValid
			? 'flex flex-col w-full relative p-2 hover:border-blue-600 dark:hover:border-blue-400 border border-red-500 rounded-md'
			: 'flex flex-col w-full relative p-2 hover:border-blue-600 dark:hover:border-blue-400 border border-slate-200 rounded-md'}
	>
		<span class="absolute left-0 top-[-1.25rem] text-xs">
			Take your notes
		</span>
		<Button
			outline
			class="!p-2 absolute top-[-0.5rem] right-[-0.5rem] hover:!bg-red-500"
			color="dark"
			on:click={() => removeNote(note.value)}
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
				id={`cue-${note.value.id}`}
				rows="8"
				placeholder="Do you have any clues?"
				bind:value={note.value.cue}
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
				id={`note-${note.value.id}`}
				rows="8"
				placeholder="Here you can put interesting things..."
				bind:value={note.value.content}
			/>
		</HorizontalPanel>
	</div>
	{#if note.isTouched && note.errors}
		<Helper class="mt-[-1.1rem]" color="red"
			>Content for note is required</Helper
		>
	{/if}
{/each}
