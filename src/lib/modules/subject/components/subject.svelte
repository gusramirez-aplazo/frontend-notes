<script lang="ts">
	import { Helper } from 'flowbite-svelte';
	import { notifierService } from '$lib/modules/notifier/services/tostr-store.service';

	import type { BaseItemDetail } from '$lib/shared/entities/base-item-detail';
	import type { SubjectStore } from '../entities';
	import { subjectStoreService } from '../services/subject-store.service';
	import { createSubjectUsecase } from '../usecases/create-one.usecase';
	import { subjectHttpClientService } from '../services/http-subject.service';
	import CustomRemovableBadge from './custom-removable-badge.svelte';

	let componentSubjects: SubjectStore;
	let currentForm: HTMLFormElement;
	let formError = '';

	subjectStoreService.subjects.subscribe((value) => {
		componentSubjects = value;
	});

	const createOneUsecase = createSubjectUsecase(
		subjectHttpClientService,
		subjectStoreService,
		notifierService
	);

	const removeSubjectBadge = (subject: BaseItemDetail) => {
		subjectStoreService.removeSelection(subject);
	};

	function createOne(this: HTMLFormElement) {
		createOneUsecase
			.execute(this)
			.then(() => {
				formError = '';
			})
			.catch((error) => {
				formError = error.message;
			});
	}
</script>

<form bind:this={currentForm} on:submit|preventDefault={createOne}>
	<label
		for="subject"
		class="grid
		grid-cols-[repeat(auto-fill,_minmax(100px,_1fr))]
		gap-3
		w-full
		h-auto
		items-center
		justify-start
		overflow-x-auto
		py-4
		px-6
		mt-8
		mb-6
		rounded-lg
		border-gray-500
		border
		border-solid"
	>
		{#each componentSubjects.selected as subject}
			{#if subject}
				<CustomRemovableBadge
					{subject}
					on:close={() => removeSubjectBadge(subject)}
				/>
			{/if}
		{/each}

		<input
			list="subject-datalist"
			type="text"
			id="subject"
			name="subject"
			class="w-auto
				outline-none
				focus:ring-transparent
				border-none
				bg-transparent
				pr-4
				py-2"
			autocomplete="off"
			on:change={() => createOne.apply(currentForm)}
		/>
	</label>

	<datalist id="subject-datalist">
		{#each componentSubjects.retrieved as sub}
			<option value={sub.name} />
		{/each}
	</datalist>
	{#if formError}
		<Helper class="mt-2" color="red">
			{formError}
		</Helper>
	{/if}
</form>
