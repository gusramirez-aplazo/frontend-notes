<script lang="ts">
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

	const categorySelection = (name: string) => {
		if (!selectedCategory) {
			return;
		}
		const selection = filteredCategories?.find((item) => item.name === name);

		if (selection) {
			selectedCategories = [...selectedCategories, selection];
			selectedCategory = '';
			filteredCategories = [
				...data.categories.filter(
					(cat) => !selectedCategories.some((sel) => sel.categoryId === cat.categoryId)
				)
			];
		}
	};

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

	$: categorySelection(selectedCategory);
	$: subjectsSelection(selectedSubject);

	console.log({ selectedCategories });
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
