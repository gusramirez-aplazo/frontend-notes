<script lang="ts">
	import type { FormControl } from '$lib/shared/entities/form-control';
	import { Helper } from 'flowbite-svelte';

	export let formControl: FormControl<string>;
</script>

<div class="flex flex-col w-full relative">
	<span class="absolute left-10 top-[-1.2rem]  text-xs">
		Write an awesome title
	</span>
	<label for="title" class="flex bg-transparent w-full justify-center mb-2">
		<input
			class="
		text-2xl
		outline-none
		focus:ring-transparent
		focus:outline-blue-400
		border-none
		bg-transparent
    "
			class:outline-red-500={formControl.isTouched && !formControl.isValid}
			type="text"
			placeholder="Title here ..."
			id="title"
			name="title"
			bind:value={formControl.value}
		/>
	</label>
	{#if formControl.isTouched && formControl.errors}
		<Helper class="mt-[-0.25rem] ml-[10%]" color="red">
			{formControl.errors.required}
		</Helper>
	{/if}
</div>
