<script lang="ts">
	import { Card } from 'flowbite-svelte';
	import type { PageData } from './$types';
	import { notifierService } from '$lib/modules/notifier/services/tostr-store.service';
	import Subject from '$lib/modules/subject/components/subject.svelte';
	import Category from '$lib/modules/category/components/category.svelte';
	import { subjectStoreService } from '$lib/modules/subject/services/subject-store.service';
	import { categoryStoreService } from '$lib/modules/category/services/category-store.service';

	export let data: PageData;

	categoryStoreService.setInitialLoad([...data.categoriesResponse.content]);
	subjectStoreService.setInitialLoad([...data.subjectsResponse.content]);

	if (!data.categoriesResponse.success) {
		notifierService.error('Ups!', "Can't retrieve categories");
	}
	if (!data.subjectsResponse.success) {
		notifierService.error('Ups!', "Can't retrieve subjects");
	}
</script>

<svelte:head>
	<title>New Note</title>
</svelte:head>

<main class="pt-4">
	<Card padding="md" size="md">
		<Category />
		<Subject />
	</Card>
</main>
