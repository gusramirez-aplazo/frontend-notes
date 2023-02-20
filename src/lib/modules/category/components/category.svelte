<script lang="ts">
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import {
		ButtonGroup,
		Button,
		Modal,
		Label,
		Input,
		Helper
	} from 'flowbite-svelte';

	import AddIcon from '$lib/shared/components/add-icon.svelte';

	import { categories } from '$lib/modules/category/store/categories';
	import { ToastrService } from '$lib/modules/notifier/services/tostr-store.service';
	import { CategoryStoreService } from '$lib/modules/category/services/category-store.service';

	import type { CategoryStore } from '../entities';
	import type { ActionData } from '../../../../routes/note/$types';

	export let form: ActionData;

	let componentCategories: CategoryStore;
	let isModalOpen = false;

	categories.subscribe((value) => {
		componentCategories = value;
	});

	const createCategory: SubmitFunction = ({ form }) => {
		return async ({ result, update }) => {
			if (result.type === 'failure') {
				await applyAction(result);
			}

			if (result.type === 'success') {
				form.reset();
				CategoryStoreService.setNewSelectedCategory(
					result.data?.formContent.response
				);
				ToastrService.success('Success!', 'Category created');
				isModalOpen = false;
			}

			update();
		};
	};
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
			<Button
				gradient={componentCategories?.selected?.id === category.id}
				outline={componentCategories?.selected?.id !== category.id}
				color={componentCategories?.selected?.id === category.id
					? 'purpleToBlue'
					: 'dark'}
				class="capitalize"
				on:click={() => CategoryStoreService.setNewSelectedCategory(category)}
			>
				<span class="whitespace-nowrap">
					{category.name}
				</span>
			</Button>
		{/each}
	</ButtonGroup>
</div>

<Modal bind:open={isModalOpen} size="xs" autoclose={false}>
	<form
		class="flex flex-col space-y-6"
		method="post"
		action="?/createCategory"
		use:enhance={createCategory}
	>
		<Label
			class="text-xl font-medium text-gray-900 dark:text-white p-0 space-y-2"
		>
			<span> Add new category </span>
			<Input
				type="text"
				name="category"
				value={form?.formContent?.inputValue ?? ''}
			/>
			{#if form?.error}
				<Helper class="mt-2" color="red">
					{form?.error?.message}
				</Helper>
			{/if}
		</Label>

		<Button type="submit" class="w-full1">Save</Button>
	</form>
</Modal>
