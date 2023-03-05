<script lang="ts">
	function handleTitleChange(event: Event) {
		event.preventDefault();
	}
</script>

<form on:submit={handleTitleChange}>
	<label for="title" class="flex bg-transparent w-full justify-center">
		<input
			class="
        text-2xl
        outline-none
				focus:ring-transparent
				border-none
				bg-transparent
				py-2
    "
			type="text"
			placeholder="Title here ..."
			id="title"
			name="title"
		/>
	</label>
</form>
