<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { ButtonGroup, Button, Modal, Label, Input } from 'flowbite-svelte';
	import { categories } from '$lib/modules/category/store/categories';
	import type { CategoryStore } from '../entities';
	import { ToastrService } from '$lib/modules/notifier/services/tostr-store.service';
	import type { BaseItemDetail } from '$lib/shared/entities/base-item-detail';
	import { CategoryStoreService } from '../services/category-store.service';

	const dispatch = createEventDispatcher();
	let componentCategories: CategoryStore;
	let isModalOpen = false;

	categories.subscribe((value) => {
		componentCategories = value;
	});

	function createCategory(this: HTMLFormElement) {
		const formData = new FormData(this);

		if (!formData.get('category')) {
			ToastrService.warning('Ups!', 'El campo no puede estar vacio');
			return;
		}

		dispatch('newCategory', {
			name: formData.get('category')
		});

		this.reset();
		isModalOpen = false;
	}

	function selectCategory(category: BaseItemDetail) {
		CategoryStoreService.setNewSelectedCategory(category);
	}
</script>

<ButtonGroup class="space-x-px">
	<Button
		outline
		color="dark"
		on:click={() => {
			isModalOpen = true;
		}}>+</Button
	>
	{#each componentCategories.retrievedCategories as category}
		<Button
			gradient={componentCategories?.selected?.id === category.id}
			outline={componentCategories?.selected?.id !== category.id}
			color={componentCategories?.selected?.id === category.id
				? 'purpleToBlue'
				: 'dark'}
			class="capitalize"
			on:click={() => selectCategory(category)}
		>
			{category.name}
		</Button>
	{/each}
</ButtonGroup>

<Modal bind:open={isModalOpen} size="xs" autoclose={false}>
	<form
		class="flex flex-col space-y-6"
		on:submit|preventDefault={createCategory}
	>
		<Label
			class="text-xl font-medium text-gray-900 dark:text-white p-0 space-y-2"
		>
			<span> Add new category </span>
			<Input type="text" name="category" placeholder="..." required />
		</Label>

		<Button type="submit" class="w-full1">Save</Button>
	</form>
</Modal>
