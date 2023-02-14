<script lang="ts">
	import type { PageData } from './$types';
	import { ToastrService } from '$lib/modules/notifier/services/tostr-store.service';
	import { CategoryStoreService } from '$lib/modules/category/services/category-store.service';
	import Subject from '$lib/modules/subject/components/subject.svelte';
	import Category from '$lib/modules/category/components/category.svelte';

	export let data: PageData;

	CategoryStoreService.setInitialLoad([...data.content]);

	if (!data.success) {
		ToastrService.error('Ups!', 'Error en la carga de categorias');
	}

	const createCategory = (event: CustomEvent) => {
		fetch('/api/category', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: event.detail.name
			})
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					CategoryStoreService.setNewSelectedCategory(data.content);
					ToastrService.success('Genial!', 'Categoria creada');
					return;
				}

				ToastrService.error('Ups!', 'Error en la creacion de la categoria');
			})
			.catch((err) => {
				console.log(err);
				ToastrService.error('Ups!', 'Error en la creacion de la categoria');
			});
	};
</script>

<main class="pt-4">
	<Category on:newCategory={createCategory} />
	<Subject />
</main>
