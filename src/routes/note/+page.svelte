<script lang="ts">
	import { Button, Card } from 'flowbite-svelte';

	import { notifierService } from '$lib/modules/notifier/services/tostr-store.service';

	import Subject from '$lib/modules/subject/components/subject.svelte';
	import Cornell from '$lib/modules/corrnell/components/cornell.svelte';
	import NoteTitle from '$lib/modules/title/components/note-title.svelte';

	import type { PageData } from './$types';
	import type { CornellNote } from '$lib/modules/corrnell/entities';
	import { cornellNoteStoreService } from '$lib/modules/corrnell/services/cornell-notes-store.service';
	import NewEmptyCornell from '$lib/modules/corrnell/components/new-empty-cornell.svelte';
	import { FormControl } from '$lib/shared/entities/form-control';
	import type { BaseItemDetail } from '$lib/shared/entities/base-item-detail';

	export let data: PageData;
	let cornellNotes: CornellNote[];
	let retrievedSubjects: BaseItemDetail[];

	let titleFormControl = new FormControl<string>('title', '');

	let selectedSubjectsFormControl = new FormControl<BaseItemDetail[]>(
		'selectedSubjects',
		[]
	);

	$: retrievedSubjects = data.content;

	cornellNoteStoreService.cornellNotes.subscribe((n) => (cornellNotes = n));

	if (!data.success) {
		notifierService.error('Ups!', "Can't retrieve subjects");
	}

	function saveCornellNote() {
		// console.log({ subjects: subjects.selected });
		// console.log({ cornellNotes });
		titleFormControl = titleFormControl.markAsTouched();
		selectedSubjectsFormControl = selectedSubjectsFormControl.markAsTouched();
	}
</script>

<svelte:head>
	<title>New Note</title>
</svelte:head>

<main class="pt-4">
	<Card padding="md" size="md">
		<form
			class="grid grid-cols-1 gap-5 pt-5"
			on:submit|preventDefault={saveCornellNote}
		>
			<NoteTitle formControl={titleFormControl} />
			<Subject bind:retrieved={data.content} {selectedSubjectsFormControl} />
			<NewEmptyCornell />
			<Cornell />

			<div class="flex justify-end w-full">
				<Button type="submit">Save Note</Button>
			</div>
		</form>
	</Card>
</main>
