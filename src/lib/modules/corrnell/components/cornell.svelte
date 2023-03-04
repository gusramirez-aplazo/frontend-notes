<script lang="ts">
	import { Button, TabItem, Tabs, Textarea } from 'flowbite-svelte';
	import HorizontalPanel from '../../../shared/components/horizontal-panel.svelte';

	const contentConfig = {
		id: 'content',
		name: 'content',
		label: 'Your content',
		rows: 3,
		placeholder: 'Take your notes...'
	};
	const cuesConfig = {
		id: 'cues',
		name: 'cues',
		label: 'Your cues',
		rows: 3,
		placeholder: 'Do you have any cues?'
	};

	function createOne(this: HTMLFormElement) {
		console.log(this);
	}
</script>

<form class="grid grid-cols-1 gap-5" on:submit|preventDefault={createOne}>
	<label for="title" class="flex bg-transparent w-full justify-center">
		<input
			class="outline-none
				focus:ring-transparent
				border-none
				bg-transparent
				py-2
    "
			type="text"
			placeholder="Awesome title"
			id="title"
			name="title"
		/>
	</label>
	<HorizontalPanel>
		<Textarea {...cuesConfig} slot="left" />

		<Textarea {...contentConfig} slot="right" />
	</HorizontalPanel>

	<div class="flex justify-end w-full">
		<Button type="submit">Save Note</Button>
	</div>
</form>
