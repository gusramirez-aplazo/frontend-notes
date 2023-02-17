<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { ButtonGroup, Button, Modal, Label, Input } from 'flowbite-svelte';

	import { categories } from '$lib/modules/category/store/categories';
	import { CategoryStoreService } from '../services/category-store.service';
	import { ToastrService } from '$lib/modules/notifier/services/tostr-store.service';

	import type { CategoryStore } from '../entities';
	import type { BaseItemDetail } from '$lib/shared/entities/base-item-detail';
	import type { ActionData } from '../../../../routes/note/$types';

	export let form: ActionData;

	let componentCategories: CategoryStore;
	let isModalOpen = false;

	categories.subscribe((value) => {
		componentCategories = value;
	});

	const selectCategory = (category: BaseItemDetail) => {
		CategoryStoreService.setNewSelectedCategory(category);
	};

	const openModal = () => {
		isModalOpen = true;
	};

	const closeModalOnSuccess = (category: BaseItemDetail) => {
		CategoryStoreService.setNewSelectedCategory(category);
		ToastrService.success('Success!', 'Category created');
		isModalOpen = false;
	};
</script>

<div class="overflow-x-auto pb-2">
	<ButtonGroup class="space-x-px max-w-full ">
		<Button outline color="dark" on:click={openModal}>+</Button>
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
</div>

<Modal bind:open={isModalOpen} size="xs" autoclose={false}>
	<form
		class="flex flex-col space-y-6"
		method="post"
		action="?/createCategory"
		use:enhance={({ form }) => {
			return async ({ result, update }) => {
				if (result.type === 'failure') {
					await applyAction(result);
				}

				if (result.type === 'success') {
					form.reset();
					closeModalOnSuccess(result.data?.formContent.response);
				}

				update();
			};
		}}
	>
		<Label
			class="text-xl font-medium text-gray-900 dark:text-white p-0 space-y-2"
		>
			<span> Add new category </span>
			<Input
				type="text"
				name="category"
				placeholder="..."
				value={form?.formContent?.category ?? ''}
			/>
			{#if form?.error}
				<p class="text-red-500 text-sm">
					{form?.error?.message}
				</p>
			{/if}
		</Label>

		<Button type="submit" class="w-full1">Save</Button>
	</form>
</Modal>
