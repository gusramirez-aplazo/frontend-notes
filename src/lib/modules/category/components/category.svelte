<script lang="ts">
	import {
		ButtonGroup,
		Button,
		Modal,
		Label,
		Input,
		Helper
	} from 'flowbite-svelte';

	import AddIcon from '$lib/shared/components/add-icon.svelte';
	import BitoneButton from '$lib/shared/components/bitone-button.svelte';

	import { notifierService } from '$lib/modules/notifier/services/tostr-store.service';
	import { categoryStoreService } from '$lib/modules/category/services/category-store.service';

	import type { CategoryStore } from '../entities';
	import { createCategoryUsecase } from '../usecases/create-category.usecase';
	import { categoryHttpClientService } from '../services/http-category.service';

	let componentCategories: CategoryStore;
	let isModalOpen = false;
	let formError = '';

	categoryStoreService.categories.subscribe((value) => {
		componentCategories = value;
	});

	const createOneUsecase = createCategoryUsecase(
		categoryHttpClientService,
		categoryStoreService,
		notifierService
	);

	function createCategory(this: HTMLFormElement) {
		createOneUsecase
			.execute(this)
			.then(() => {
				isModalOpen = false;
				formError = '';
			})
			.catch((error) => {
				formError = error.message;
			});
	}
</script>

<div class="overflow-x-auto pb-2 relative flex w-full">
	<span
		class="sticky inline-flex top-0 left-0 bg-white dark:bg-gray-800 pr-2 z-30"
	>
		<Button outline color="dark" on:click={() => (isModalOpen = true)}>
			<AddIcon />
		</Button>
	</span>
	<ButtonGroup class="space-x-px max-w-full pl-1">
		{#each componentCategories.retrievedCategories as category}
			<BitoneButton
				active={componentCategories?.selected?.id === category.id}
				on:click={() => categoryStoreService.setNewSelection(category)}
			>
				{category.name}
			</BitoneButton>
		{/each}
	</ButtonGroup>
</div>

<Modal bind:open={isModalOpen} size="xs" autoclose={false}>
	<form
		class="flex flex-col space-y-6"
		on:submit|preventDefault={createCategory}
	>
		<Label
			class="text-xl font-medium text-gray-900 dark:text-white p-0 space-y-2"
		>
			<span> Add new category </span>
			<Input type="text" name="category" placeholder="write new name" />
			{#if formError}
				<Helper class="mt-2" color="red">
					{formError}
				</Helper>
			{/if}
		</Label>

		<Button type="submit" class="w-full">Save</Button>
	</form>
</Modal>
