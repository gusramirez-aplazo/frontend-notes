<script lang="ts">
	import { Helper } from 'flowbite-svelte';
	import { notifierService } from '$lib/modules/notifier/services/tostr-store.service';

	import type { BaseItemDetail } from '$lib/shared/entities/base-item-detail';
	import type { FormControl } from '$lib/shared/entities/form-control';

	import { createSubjectUsecase } from '../usecases/create-one.usecase';
	import { subjectHttpClientService } from '../services/http-subject.service';
	import CustomRemovableBadge from './custom-removable-badge.svelte';

	export let retrieved: BaseItemDetail[];
	export let formControl: FormControl<BaseItemDetail[]>;

	const createOneUsecase = createSubjectUsecase(
		subjectHttpClientService,
		notifierService
	);

	const removeSubjectBadge = (subject: BaseItemDetail) => {
		formControl.value = formControl.value.filter(
			(item) => item.id !== subject.id
		);
		retrieved = [...retrieved, subject];
	};

	function createOne(event: Event) {
		const el = event.target as HTMLInputElement;
		if (!el.value.trim()) {
			return;
		}

		createOneUsecase
			.execute(el.value, formControl.value, retrieved)
			.then((data) => {
				formControl.value = data.selected;
				retrieved = data.retrieved;
				el.value = '';
			})
			.catch((error) => {
				console.warn(error);
			});
	}
</script>

<div class="flex w-full relative flex-col mt-8">
	<span class="absolute left-0 top-[-1.1rem] text-xs">
		Add tags to your note
	</span>
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
		mb-6
		rounded-lg
		border-gray-500
		border
		border-solid
		hover:border-blue-600
		dark:hover:border-blue-400
		focus-within:border-blue-600
		dark:focus-within:border-blue-400
		"
		class:border-red-500={formControl.isTouched && !formControl.isValid}
	>
		{#each formControl.value as subject}
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
			on:change={createOne}
		/>
	</label>
</div>
{#if formControl.isTouched && formControl.errors}
	<Helper class="mt-[-2rem]" color="red">
		{formControl.errors.required}
	</Helper>
{/if}

<datalist id="subject-datalist">
	{#each retrieved as sub}
		<option value={sub.name} />
	{/each}
</datalist>
