<script lang="ts">
	import { debounce } from '../../infra/shared/debounce';
	import type { ApiResponse } from '../../interfaces/api-response';

	/** @type {import('./$types').PageData} */
	export let data: {
		subjects: CommonResponseContent[];
		categories: CommonResponseContent[];
	} = {
		subjects: [],
		categories: []
	};

	import type { CommonResponseContent } from '../../interfaces/common-response-content';

	let selectedCategory = '';
	let filteredCategories = data.categories;
	let selectedCategories: CommonResponseContent[] = [];

	let selectedSubject = '';
	let filteredSubjects = data.subjects;
	let selectedSubjects: CommonResponseContent[] = [];

	const createCategory = (name: string): Promise<ApiResponse<CommonResponseContent>> => {
		return fetch('/api/category', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name })
		}).then((res) => res.json());
	};

	const categorySelection = debounce(() => {
		if (!selectedCategory) {
			return;
		}
		const selection = filteredCategories?.find((item) => item.name === selectedCategory);

		if (selection) {
			selectedCategories = [...selectedCategories, selection];
			selectedCategory = '';
			filteredCategories = [
				...data.categories.filter(
					(cat) => !selectedCategories.some((sel) => sel.categoryId === cat.categoryId)
				)
			];
			return;
		}

		createCategory(selectedCategory)
			.then((createCategoryResponse) => {
				if (createCategoryResponse.success) {
					const newCategory: CommonResponseContent = {
						categoryId: createCategoryResponse.content.categoryId,
						name: createCategoryResponse.content.name,
						createdAt: createCategoryResponse.content.createdAt,
						description: createCategoryResponse.content.description
					};

					selectedCategories = [...selectedCategories, newCategory];
					selectedCategory = '';

					data.categories = [...data.categories, newCategory];

					filteredCategories = [
						...data.categories.filter(
							(cat) => !selectedCategories.some((sel) => sel.categoryId === cat.categoryId)
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
	}, 350);

	const subjectsSelection = (name: string) => {
		if (!selectedSubject) {
			return;
		}
		const selection = filteredSubjects?.find((item) => item.name === name);

		if (selection) {
			selectedSubjects = [...selectedSubjects, selection];
			selectedSubject = '';
			filteredSubjects = [
				...data.subjects.filter(
					(cat) => !selectedSubjects.some((sel) => sel.subjectId === cat.subjectId)
				)
			];
		}
	};

	$: subjectsSelection(selectedSubject);
</script>

<div class="container">
	<main class="note-main">
		<form class="note-form">
			<div class="note-form--header">
				<h1 class="note-form--title">New note</h1>
			</div>

			<div class="note-form--body">
				<div class="form-group">
					<label for="note-title" class="form-input--label">Title</label>
					<input type="text" class="form-input" id="note-title" />
				</div>

				<div class="form-group">
					<div>
						<span>Selected Categories</span>
						<ul>
							{#each selectedCategories as selection}
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
						autocomplete="off"
						bind:value={selectedCategory}
						on:change={categorySelection}
					/>

					<datalist id="datalist-categories">
						{#each filteredCategories as category}
							<option value={category.name} />
						{/each}
					</datalist>
				</div>

				<div class="form-group">
					<div>
						<span>Selected Subjects</span>
						<ul>
							{#each selectedSubjects as selection}
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
						autocomplete="off"
						bind:value={selectedSubject}
					/>

					<datalist id="datalist-subjects">
						{#each filteredSubjects as subject}
							<option value={subject.name} />
						{/each}
					</datalist>
				</div>

				<div class="form-group">
					<label for="note-content" class="form-input--label">Content</label>
					<textarea class="form-textarea" id="note-content" />
				</div>
			</div>

			<div class="note-form--footer">
				<button class="note-form--footer--button">Save</button>
			</div>
		</form>
	</main>
</div>
