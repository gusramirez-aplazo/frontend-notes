<script lang="ts">
	import { Card } from 'flowbite-svelte';

	import { notifierService } from '$lib/modules/notifier/services/tostr-store.service';
	import { subjectStoreService } from '$lib/modules/subject/services/subject-store.service';

	import Subject from '$lib/modules/subject/components/subject.svelte';
	import Cornell from '$lib/modules/corrnell/components/cornell.svelte';

	import type { PageData } from './$types';
	import NoteTitle from '$lib/modules/title/components/note-title.svelte';

	export let data: PageData;

	subjectStoreService.setInitialLoad([...data.subjectsResponse.content]);

	if (!data.subjectsResponse.success) {
		notifierService.error('Ups!', "Can't retrieve subjects");
	}
</script>

<svelte:head>
	<title>New Note</title>
</svelte:head>

<main class="pt-4">
	<Card padding="md" size="md">
		<NoteTitle />
		<Subject />
		<Cornell />
	</Card>
</main>
