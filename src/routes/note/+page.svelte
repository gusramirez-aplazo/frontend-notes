<script lang="ts">
	import { Button, Card } from 'flowbite-svelte';

	import { notifierService } from '$lib/modules/notifier/services/tostr-store.service';

	import AddIcon from '$lib/shared/components/add-icon.svelte';
	import Subject from '$lib/modules/subject/components/subject.svelte';
	import AppNote from '$lib/modules/notes/components/note.svelte';
	import NoteTitle from '$lib/modules/title/components/note-title.svelte';

	import { FormControl } from '$lib/shared/entities/form-control';
	import { Note } from '$lib/modules/notes/entities';

	import type { PageData } from './$types';
	import type { BaseItemDetail } from '$lib/shared/entities/base-item-detail';
	import { createCornellNoteUsecase } from '$lib/modules/cornell/usecases/create-one.usecase';
	import { cornellHttpClientService } from '$lib/modules/cornell/services/http-cornell.service';

	export let data: PageData;
	let retrievedSubjects: BaseItemDetail[];

	let titleFormControl = new FormControl<string>('title', '');

	let selectedSubjectsFormControl = new FormControl<BaseItemDetail[]>(
		'selectedSubjects',
		[],
		'name'
	);

	let notesFormControl = new FormControl<Note[]>(
		'notes',
		[Note.create('', '')],
		'content'
	);

	$: retrievedSubjects = data.content;

	if (!data.success) {
		notifierService.error('Ups!', "Can't retrieve subjects");
	}

	const usecase = createCornellNoteUsecase(
		cornellHttpClientService,
		notifierService
	);

	function saveCornellNote() {
		titleFormControl = titleFormControl.markAsTouched();
		selectedSubjectsFormControl = selectedSubjectsFormControl.markAsTouched();
		notesFormControl = notesFormControl.markAsTouched();

		if (
			!titleFormControl.isValid ||
			!selectedSubjectsFormControl.isValid ||
			!notesFormControl.isValid
		) {
			return;
		}

		usecase
			.execute(
				titleFormControl.value,
				selectedSubjectsFormControl.value,
				notesFormControl.value
			)
			.then((r) => {
				console.log(r);
				retrievedSubjects = [
					...retrievedSubjects,
					...selectedSubjectsFormControl.value
				];
				titleFormControl.reset();
				selectedSubjectsFormControl.reset();
				notesFormControl.reset();
			})
			.catch((e) => {
				console.log(e);
			});
	}

	function addEmptyNote() {
		notesFormControl.value = [...notesFormControl.value, Note.create('', '')];
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

			<Subject
				bind:retrieved={data.content}
				formControl={selectedSubjectsFormControl}
			/>

			<Button type="button" outline class="w-full my-5" on:click={addEmptyNote}>
				<span class="mx-3"> Add empty note </span>
				<AddIcon />
			</Button>

			<AppNote formControl={notesFormControl} />

			<Button class="my-5" type="submit">Save Note</Button>
		</form>
	</Card>
</main>
