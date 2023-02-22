<script lang="ts">
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import { Badge, Helper, Tooltip } from 'flowbite-svelte';
	import { subjects } from '$lib/modules/subject/store/subjects';
	import { notifierService } from '$lib/modules/notifier/services/tostr-store.service';
	import { SubjectStoreService } from '$lib/modules/subject/services/subject-store.service';
	import CloseIcon from '$lib/shared/components/close-icon.svelte';

	import type { BaseItemDetail } from '$lib/shared/entities/base-item-detail';
	import type { SubjectStore } from '../entities';
	import type { ActionData } from '../../../../routes/note/$types';

	export let form: ActionData;

	let componentSubjects: SubjectStore;
	let thisForm: HTMLFormElement;

	subjects.subscribe((value) => {
		componentSubjects = value;
	});

	const removeSubjectBadge = (subject: BaseItemDetail) => {
		SubjectStoreService.removeSelectedSubject(subject);
	};

	const submitCreateSubject: SubmitFunction = ({ form, data }) => {
		console.log(form);
		return async ({ result, update }) => {
			if (result.type === 'failure') {
				await applyAction(result);
			}

			if (result.type === 'success') {
				form.reset();
				SubjectStoreService.setNewSelectedSubject(
					result.data?.formContent.response
				);
				notifierService.success('Success!', 'Category created');
			}

			update();
		};
	};
</script>

<form
	bind:this={thisForm}
	action="?/createSubject"
	method="post"
	use:enhance={submitCreateSubject}
>
	<label
		for="subject"
		class="grid
	grid-cols-[repeat(auto-fill,_minmax(100px,_1fr))]
	gap-3
	w-full
	h-auto
	items-center
	justify-between
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
				<Badge border large color="green" class="subject-badge">
					<p class="truncate">
						{subject.name}
					</p>

					<button
						on:click={() => removeSubjectBadge(subject)}
						type="button"
						class="inline-flex items-center p-0.5 ml-2 text-sm bg-transparent rounded-sm text-blue-400 hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300"
						aria-label="Remove"
					>
						<CloseIcon />
					</button>
				</Badge>

				<Tooltip triggeredBy=".subject-badge">
					{subject.name}
				</Tooltip>
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
			value={form?.formContent?.inputValue ?? ''}
			on:change={() => thisForm.submit()}
		/>
	</label>

	<datalist id="subject-datalist">
		{#each componentSubjects.retrieved as sub}
			<option value={sub.name} />
		{/each}
	</datalist>
	{#if form?.error}
		<Helper class="mt-2" color="red">
			{form?.error?.message}
		</Helper>
	{/if}
</form>
