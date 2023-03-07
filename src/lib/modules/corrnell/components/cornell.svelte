<script lang="ts">
	import type { CornellNote } from '../entities';
	import { cornellNoteStoreService } from '../services/cornell-notes-store.service';
	import HorizontalPanel from '$lib/shared/components/horizontal-panel.svelte';

	let notes: CornellNote[];

	cornellNoteStoreService.cornellNotes.subscribe((n) => {
		notes = n;
	});

	function removeNote(note: CornellNote) {
		cornellNoteStoreService.removeNote(note);
	}

	function setCue(event: Event, note: CornellNote) {
		const el = event.target as HTMLTextAreaElement;
		note.cue = el?.value?.trim() || '';
		cornellNoteStoreService.updateNote(note);
	}

	function setNote(event: Event, note: CornellNote) {
		const el = event.target as HTMLTextAreaElement;
		note.content = el?.value?.trim() || '';
		cornellNoteStoreService.updateNote(note);
	}
</script>

{#each notes as note}
	<HorizontalPanel>
		<textarea
			class="
					block
					w-full
					resize-none
					bg-transparent
					border-gray-300
					dark:border-gray-600
				"
			slot="left"
			name="cue"
			id={`cue-${note.id}`}
			rows="5"
			placeholder="Do you have any clues?"
			on:change={(e) => setCue(e, note)}
		/>

		<textarea
			class="
					block
					w-full
					resize-none
					bg-transparent
					border-gray-300
					dark:border-gray-600
					"
			slot="right"
			name="note"
			id={`note-${note.id}`}
			rows="5"
			placeholder="Take your notes..."
			required
			on:change={(e) => setNote(e, note)}
		/>
	</HorizontalPanel>
{/each}
