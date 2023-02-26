<script lang="ts">
	import { Button, TabItem, Tabs, Textarea } from 'flowbite-svelte';

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

	<div>
		<Tabs style="full">
			<TabItem open title="Content">
				<Textarea {...contentConfig} />
			</TabItem>
			<TabItem title="Cues">
				<Textarea {...cuesConfig} />
			</TabItem>
		</Tabs>
	</div>

	<div class="flex justify-end w-full">
		<Button type="submit">Save Note</Button>
	</div>
</form>
