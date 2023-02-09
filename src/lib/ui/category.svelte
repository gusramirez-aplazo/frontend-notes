<script lang="ts">
	import { category } from '$lib/store/categories';
	import type { CommonResponseContent } from '../../interfaces/common-response-content';
	import { createGroupingContent } from '../../routes/note/createGroupingContent';

	let localCategory: {
		selection: CommonResponseContent[];
		items: CommonResponseContent[];
	} = {
		selection: [],
		items: []
	};

	category.subscribe((value) => {
		localCategory = value;
	});

	let currentSelection: string = '';
	export let selectedItemsLabel = 'Selected Categories';
	export let inputLabel = 'Categories';

	const categorySelection = () => {
		if (!currentSelection) {
			return;
		}
		const selection = localCategory.items.find((item) => item.name === currentSelection);

		if (selection) {
			category.update((val) => {
				return {
					selection: [...val.selection, selection],
					items: [...val.items.filter((i) => i.id !== selection.id)]
				};
			});
			currentSelection = '';
			return;
		}

		createGroupingContent('category', currentSelection)
			.then((createCategoryResponse) => {
				if (createCategoryResponse.success) {
					const newCategory: CommonResponseContent = {
						id: createCategoryResponse.content.id,
						name: createCategoryResponse.content.name,
						createdAt: createCategoryResponse.content.createdAt
					};

					category.update((val) => {
						return {
							selection: [...val.selection, newCategory],
							items: [...val.items.filter((i) => i.id !== newCategory.id)]
						};
					});
					currentSelection = '';
				} else {
					throw Error(createCategoryResponse.error);
				}
			})
			.catch((e) => {
				console.warn(e);
				alert('Error creating category');
			});
	};
</script>

<form class="form-group" on:submit|preventDefault={categorySelection}>
	<div>
		<span>
			{selectedItemsLabel}
		</span>
		<ul>
			{#each localCategory.selection as selection}
				<li>
					{selection.name}
				</li>
			{/each}
		</ul>
	</div>
	<label for="category" class="form-input--label">
		{inputLabel}
	</label>
	<input
		type="text"
		list="datalist-categories"
		class="form-input"
		id="category"
		name="category"
		autocomplete="off"
		bind:value={currentSelection}
		on:change={categorySelection}
	/>

	<datalist id="datalist-categories">
		{#each localCategory.items as cat}
			<option value={cat.name} />
		{/each}
	</datalist>
</form>

<style>
</style>
