<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { category } from '$lib/store/categories';
	import { subject } from '$lib/store/subjects';
	import { toastr } from '$lib/store/toastr';
	import Category from '$lib/ui/category.svelte';
	import Subject from '$lib/ui/subject.svelte';

	import type { PageData } from './$types';
	import type { ApiResponse } from '../../interfaces/api-response';
	import type { CommonResponseContent } from '../../interfaces/common-response-content';

	export let data: PageData = {
		subjects: [],
		categories: []
	};

	let localCategory: {
		selection: CommonResponseContent[];
		items: CommonResponseContent[];
	} = {
		selection: [],
		items: []
	};

	let localSubject: {
		selection: CommonResponseContent[];
		items: CommonResponseContent[];
	} = {
		selection: [],
		items: []
	};

	category.subscribe((value) => {
		localCategory = value;
	});

	category.set({
		selection: [],
		items: data.categories
	});

	subject.subscribe((value) => {
		localSubject = value;
	});

	subject.set({
		selection: [],
		items: data.subjects
	});

	async function handleSubmit(this: any, event: Event) {
		const formData = new FormData(this);

		if (!formData.get('topic')) {
			toastr.update((val) => {
				return {
					...val,
					title: 'Error',
					message: 'Please enter a title',
					type: 'error',
					isShown: true
				};
			});
			return;
		}

		if (localCategory.selection.length === 0) {
			toastr.update((val) => {
				return {
					...val,
					title: 'Ups',
					message: 'Add at least one category',
					type: 'error',
					isShown: true
				};
			});
			return;
		}

		if (localSubject.selection.length === 0) {
			toastr.update((val) => {
				return {
					...val,
					title: 'Ups',
					message: 'Add at least one subject',
					type: 'error',
					isShown: true
				};
			});
			return;
		}

		const resp = await fetch('/api/cornell-note', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				topic: formData.get('topic'),
				categories: localCategory.selection,
				subjects: localSubject.selection
			})
		});

		const result: ApiResponse<CommonResponseContent> = await resp.json();

		if (!result.success) {
			toastr.update((val) => {
				return {
					...val,
					title: 'Error',
					message: result.error,
					type: 'error',
					isShown: true
				};
			});
			return;
		}

		toastr.update((val) => {
			return {
				...val,
				title: 'Success',
				message: 'Note created',
				type: 'success',
				isShown: true
			};
		});

		await invalidateAll();

		category.set({
			selection: [],
			items: data.categories
		});
		subject.set({
			selection: [],
			items: data.subjects
		});
		this.reset();
	}
</script>

<div class="container">
	<main class="note-main">
		<Category />

		<Subject />

		<form class="note-form" on:submit|preventDefault={handleSubmit}>
			<div class="note-form--header">
				<h1 class="note-form--title">New note</h1>
			</div>

			<div class="note-form--body">
				<div class="form-group">
					<label for="note-title" class="form-input--label">Title</label>
					<input type="text" class="form-input" id="note-title" name="topic" />
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
