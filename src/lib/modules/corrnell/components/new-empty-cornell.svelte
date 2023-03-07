<script lang="ts">
	import AddIcon from '$lib/shared/components/add-icon.svelte';
	import { Button } from 'flowbite-svelte';
	import { CornellNote } from '../entities';
	import { cornellNoteStoreService } from '../services/cornell-notes-store.service';

	function newEmptyNote() {
		cornellNoteStoreService.addNote(CornellNote.create('', ''));
	}
</script>

<div class="flex py-3">
	<Button type="button" outline class="w-full" on:click={newEmptyNote}>
		<span class="mx-3"> Add empty note </span>
		<AddIcon />
	</Button>
</div>
