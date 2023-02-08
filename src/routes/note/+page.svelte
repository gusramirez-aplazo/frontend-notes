<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import type { CommonResponseContent } from '../../interfaces/common-response-content';

	import { createGroupingContent } from './createGroupingContent';
	import type { ReactiveData } from './category';
	import { applyAction, deserialize } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import type { ActionResult } from '@sveltejs/kit';

	export let form: ActionData;

	export let data: PageData = {
		subjects: [],
		categories: []
	};

	let category: ReactiveData = {
		currentSelection: '',
		filteredItems: data.categories,
		selectedItems: []
	};

	let subject: ReactiveData = {
		currentSelection: '',
		filteredItems: data.subjects,
		selectedItems: []
	};

	const categorySelection = () => {
		if (!category.currentSelection) {
			return;
		}
		const selection = category.filteredItems.find(
			(item) => item.name === category.currentSelection
		);

		if (selection) {
			category.selectedItems = [...category.selectedItems, selection];
			category.currentSelection = '';
			category.filteredItems = [
				...category.filteredItems.filter(
					(cat) => !category.selectedItems.some((sel) => sel.id === cat.id)
				)
			];
			return;
		}

		createGroupingContent('category', category.currentSelection)
			.then((createCategoryResponse) => {
				if (createCategoryResponse.success) {
					const newCategory: CommonResponseContent = {
						id: createCategoryResponse.content.id,
						name: createCategoryResponse.content.name,
						createdAt: createCategoryResponse.content.createdAt
					};

					category.selectedItems = [...category.selectedItems, newCategory];
					category.currentSelection = '';

					data.categories = [...data.categories, newCategory];

					category.filteredItems = [
						...data.categories.filter(
							(cat) => !category.selectedItems.some((sel) => sel.id === cat.id)
						)
					];
				} else {
					throw Error(createCategoryResponse.error);
				}
			})
			.catch((e) => {
				console.warn(e);
				alert('Error creating category');
			});
	};
	const subjectSelection = () => {
		if (!subject.currentSelection) {
			return;
		}
		const selection = subject.filteredItems.find((item) => item.name === subject.currentSelection);

		if (selection) {
			subject.selectedItems = [...subject.selectedItems, selection];
			subject.currentSelection = '';
			subject.filteredItems = [
				...subject.filteredItems.filter(
					(cat) => !subject.selectedItems.some((sel) => sel.id === cat.id)
				)
			];
			return;
		}

		createGroupingContent('subject', subject.currentSelection)
			.then((createCategoryResponse) => {
				if (createCategoryResponse.success) {
					const newCategory: CommonResponseContent = {
						id: createCategoryResponse.content.id,
						name: createCategoryResponse.content.name,
						createdAt: createCategoryResponse.content.createdAt
					};

					subject.selectedItems = [...subject.selectedItems, newCategory];
					subject.currentSelection = '';

					data.categories = [...data.categories, newCategory];

					subject.filteredItems = [
						...data.categories.filter(
							(cat) => !subject.selectedItems.some((sel) => sel.id === cat.id)
						)
					];
				} else {
					throw Error(createCategoryResponse.error);
				}
			})
			.catch((e) => {
				console.warn(e);
				alert('Error creating subject');
			});
	};

	async function handleSubmit(this: any, event: Event) {
		const data = new FormData(this);

		const resp = await fetch('/api/cornell-note', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				topic: data.get('topic'),
				categories: category.selectedItems,
				subjects: subject.selectedItems
			})
		});

		const result: ActionResult = await resp.json();

		if (result.type === 'success') {
			// re-run all `load` functions, following the successful update
			await invalidateAll();
		}

		applyAction(result);
	}
</script>

<div class="container">
	<main class="note-main">
		<form class="note-form" method="POST" on:submit|preventDefault={handleSubmit}>
			<div class="note-form--header">
				<h1 class="note-form--title">New note</h1>
			</div>

			<div class="note-form--body">
				<div class="form-group">
					<label for="note-title" class="form-input--label">Title</label>
					<input type="text" class="form-input" id="note-title" name="topic" />
				</div>

				<div class="form-group">
					<div>
						<span>Selected Categories</span>
						<ul>
							{#each category.selectedItems as selection}
								<li>
									{selection.name}
								</li>
							{/each}
						</ul>
					</div>
					<label for="category" class="form-input--label">Categories</label>
					<input
						type="text"
						list="datalist-categories"
						class="form-input"
						id="category"
						name="category"
						autocomplete="off"
						bind:value={category.currentSelection}
						on:change={categorySelection}
					/>

					<datalist id="datalist-categories">
						{#each category.filteredItems as cat}
							<option value={cat.name} />
						{/each}
					</datalist>
				</div>

				<div class="form-group">
					<div>
						<span>Selected Subjects</span>
						<ul>
							{#each subject.selectedItems as selection}
								<li>
									{selection.name}
								</li>
							{/each}
						</ul>
					</div>

					<label for="subject" class="form-input--label">Subjects</label>
					<input
						type="text"
						class="form-input"
						id="subject"
						list="datalist-subjects"
						name="subject"
						autocomplete="off"
						bind:value={subject.currentSelection}
						on:change={subjectSelection}
					/>

					<datalist id="datalist-subjects">
						{#each subject.filteredItems as sub}
							<option value={sub.name} />
						{/each}
					</datalist>
				</div>

				<div class="form-group">
					<label for="note-content" class="form-input--label">Content</label>
					<textarea class="form-textarea" id="note-content" />
				</div>
			</div>

			<div class="note-form--footer">
				<button type="submit" class="note-form--footer--button">Save</button>
			</div>
		</form>
	</main>
</div>
