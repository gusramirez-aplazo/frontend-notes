<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Button, Card } from 'flowbite-svelte';

	import AppNote from '$lib/modules/notes/components/note.svelte';
	import Subject from '$lib/modules/subject/components/subject.svelte';
	import NoteTitle from '$lib/modules/title/components/note-title.svelte';
	import AddIcon from '$lib/shared/components/add-icon.svelte';

	import { Note } from '$lib/modules/notes/entities';
	import { FormArray } from '$lib/shared/entities/form-array';
	import { FormControl } from '$lib/shared/entities/form-control';

	import type { BaseItemDetail } from '$lib/shared/entities/base-item-detail';
	import type { CornellNoteContentUIDto } from '../entities';

	export let cornellNoteContent: CornellNoteContentUIDto;

	const dispatcher = createEventDispatcher<{
		submit: CornellNoteContentUIDto;
	}>();

	let titleFormControl = new FormControl<string>(
		'title',
		cornellNoteContent.title || ''
	);

	let selectedSubjectsFormControl = new FormControl<BaseItemDetail[]>(
		'selectedSubjects',
		[],
		'name'
	);

	let notesFormArray = new FormArray<Note>('notes', [
		new FormControl('note', Note.create('', ''), 'content')
	]);

	function addEmptyNote() {
		notesFormArray.value = [
			...notesFormArray.value,
			new FormControl('note', Note.create('', ''))
		];
	}

	function saveCornellNote() {
		titleFormControl = titleFormControl.markAsTouched();
		selectedSubjectsFormControl = selectedSubjectsFormControl.markAsTouched();
		notesFormArray = notesFormArray.markAllAsTouched();

		if (
			!titleFormControl.isValid ||
			!selectedSubjectsFormControl.isValid ||
			!notesFormArray.isValid
		) {
			return;
		}

		dispatcher('submit', {
			title: titleFormControl.value,
			subjects: cornellNoteContent.subjects,
			selectedSubjects: selectedSubjectsFormControl.value,
			notes: notesFormArray.value.map((note) => ({
				content: note.value.content,
				cue: note.value.cue
			}))
		});

		cornellNoteContent.subjects = Array.from(
			new Set([
				...cornellNoteContent.subjects,
				...selectedSubjectsFormControl.value
			])
		);
		titleFormControl = titleFormControl.reset('');
		selectedSubjectsFormControl = selectedSubjectsFormControl.reset([]);
		notesFormArray = notesFormArray.reset([
			new FormControl('note', Note.create('', ''))
		]);
	}
</script>

<main class="pt-4">
	<Card padding="md" size="md">
		<form
			class="grid grid-cols-1 gap-5 pt-5"
			on:submit|preventDefault={saveCornellNote}
		>
			<NoteTitle formControl={titleFormControl} />

			<Subject
				bind:retrieved={cornellNoteContent.subjects}
				formControl={selectedSubjectsFormControl}
			/>

			<Button type="button" outline class="w-full mb-8" on:click={addEmptyNote}>
				<span class="mx-3"> Add empty note </span>
				<AddIcon />
			</Button>

			<AppNote formArray={notesFormArray} />

			<Button class="my-5" type="submit">Save Note</Button>
		</form>
	</Card>
</main>
