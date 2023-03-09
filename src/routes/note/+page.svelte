<script lang="ts">
	import CornellNote from '$lib/modules/cornell/components/cornell.svelte';

	import { Note } from '$lib/modules/notes/entities';
	import { notifierService } from '$lib/modules/notifier/services/tostr-store.service';
	import { createCornellNoteUsecase } from '$lib/modules/cornell/usecases/create-one.usecase';
	import { cornellHttpClientService } from '$lib/modules/cornell/services/http-cornell.service';

	import type { PageData } from './$types';
	import type { CornellNoteContentUIDto } from '$lib/modules/cornell/entities';

	export let data: PageData;

	if (!data.success) {
		notifierService.error('Ups!', "Can't retrieve subjects");
	}

	let cornellNoteContent: CornellNoteContentUIDto = {
		title: '',
		subjects: data?.content ?? [],
		selectedSubjects: [],
		notes: [Note.create('', '')]
	};

	const usecase = createCornellNoteUsecase(
		cornellHttpClientService,
		notifierService
	);

	function saveCornellNote(content: CustomEvent<CornellNoteContentUIDto>) {
		console.log(content);

		// usecase
		// 	.execute(
		// 		titleFormControl.value,
		// 		selectedSubjectsFormControl.value,
		// 		notesFormControl.value
		// 	)
		// 	.then((r) => {
		// 		console.log(r);
		// })
		// .catch((e) => {
		// 	console.log(e);
		// });
	}
</script>

<svelte:head>
	<title>New Note</title>
</svelte:head>

<main class="pt-4">
	<CornellNote {cornellNoteContent} on:submit={saveCornellNote} />
</main>
