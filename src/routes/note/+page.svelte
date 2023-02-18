<script lang="ts">
	import { Card } from 'flowbite-svelte';
	import type { ActionData, PageData } from './$types';
	import { ToastrService } from '$lib/modules/notifier/services/tostr-store.service';
	import { CategoryStoreService } from '$lib/modules/category/services/category-store.service';
	import Subject from '$lib/modules/subject/components/subject.svelte';
	import Category from '$lib/modules/category/components/category.svelte';

	export let data: PageData;
	export let form: ActionData;

	CategoryStoreService.setInitialLoad([...data.categoriesResponse.content]);

	if (!data.categoriesResponse.success) {
		ToastrService.error('Ups!', "Can't retrieve categories");
	}
	if (!data.subjectsResponse.success) {
		ToastrService.error('Ups!', "Can't retrieve subjects");
	}
</script>

<svelte:head>
	<title>New Note</title>
</svelte:head>

<main class="pt-4">
	<Card padding="md" size="md">
		<Category {form} />
		<Subject />
	</Card>
</main>
