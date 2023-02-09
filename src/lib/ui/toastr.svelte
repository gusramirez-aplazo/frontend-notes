<script lang="ts">
	import { toastr } from '$lib/store/toastr';

	let content: {
		title: string;
		message: string;
		type?: 'success' | 'error' | 'warning' | 'info';
		isShown?: boolean;
	};

	toastr.subscribe((toastr) => {
		if (toastr) {
			content = toastr;
		}
	});

	toastr.set({
		title: 'Hello',
		message: 'World',
		type: 'info',
		isShown: false
	});
</script>

{#if content.isShown}
	<div class="toastr-container">
		<button
			on:click={() =>
				toastr.update((val) => {
					return {
						...val,
						isShown: false
					};
				})}
		>
			X
		</button>
		<div class="toastr">
			<h4 class="toastr--title">
				{content.title}
			</h4>
			<p class="toastr--message">
				{content.message}
			</p>
		</div>
	</div>
{/if}

<style>
	.toastr-container {
		position: absolute;
		top: 1.5rem;
		right: 1.5rem;
		width: auto;
		height: auto;
	}

	.toastr {
		max-width: 26ch;
		padding: 0.5rem 1rem;
		background-color: var(--color-gray-2);
		color: var(--color-gray-8);
		border-radius: 8px;
		box-shadow: 0 0 2px rgba(0, 0, 0, 0.2), 1px 0 10px 2px rgba(0, 0, 0, 0.2);
	}
</style>
