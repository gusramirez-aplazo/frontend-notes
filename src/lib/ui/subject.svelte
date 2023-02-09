<script lang="ts">
	import { subject } from '$lib/store/subjects';
	import type { CommonResponseContent } from '../../interfaces/common-response-content';
	import { createGroupingContent } from '../../routes/note/createGroupingContent';

	let localSubject: {
		selection: CommonResponseContent[];
		items: CommonResponseContent[];
	} = {
		selection: [],
		items: []
	};

	subject.subscribe((value) => {
		localSubject = value;
	});

	let currentSelection: string = '';
	export let selectedItemsLabel = 'Selected Subjects';
	export let inputLabel = 'Subjects';

	const selectSubject = () => {
		if (!currentSelection) {
			return;
		}
		const selection = localSubject.items.find((item) => item.name === currentSelection);

		if (selection) {
			subject.update((val) => {
				return {
					selection: [...val.selection, selection],
					items: [...val.items.filter((i) => i.id !== selection.id)]
				};
			});
			currentSelection = '';
			return;
		}

		createGroupingContent('subject', currentSelection)
			.then((response) => {
				if (response.success) {
					const newItem: CommonResponseContent = {
						id: response.content.id,
						name: response.content.name,
						createdAt: response.content.createdAt
					};

					subject.update((val) => {
						return {
							selection: [...val.selection, newItem],
							items: [...val.items.filter((i) => i.id !== newItem.id)]
						};
					});
					currentSelection = '';
				} else {
					throw Error(response.error);
				}
			})
			.catch((e) => {
				console.warn(e);
				alert('Error creating subject');
			});
	};
</script>

<form class="form-group" on:submit|preventDefault={selectSubject}>
	<div>
		<span>
			{selectedItemsLabel}
		</span>
		<ul>
			{#each localSubject.selection as selection}
				<li>
					{selection.name}
				</li>
			{/each}
		</ul>
	</div>
	<label for="subject" class="form-input--label">
		{inputLabel}
	</label>
	<input
		type="text"
		list="datalist-subjects"
		class="form-input"
		id="subject"
		name="subject"
		autocomplete="off"
		bind:value={currentSelection}
		on:change={selectSubject}
	/>

	<datalist id="datalist-subjects">
		{#each localSubject.items as cat}
			<option value={cat.name} />
		{/each}
	</datalist>
</form>

<style>
</style>
