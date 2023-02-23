<script lang="ts">
	import { notifierService } from '../services/tostr-store.service';

	import type { ToastrConfig, ToastrType } from '../entities';

	import InfoIcon from '$lib/shared/components/info-icon.svelte';
	import ErrorIcon from '$lib/shared/components/error-icon.svelte';
	import WarningIcon from '$lib/shared/components/warning-icon.svelte';
	import SuccessIcon from '$lib/shared/components/success-icon.svelte';
	import { Toast } from 'flowbite-svelte';
	import { fly } from 'svelte/transition';
	import CloseIcon from '$lib/shared/components/close-icon.svelte';

	const icons = new Map<ToastrType, any>();

	icons.set('info', InfoIcon);
	icons.set('error', ErrorIcon);
	icons.set('warning', WarningIcon);
	icons.set('success', SuccessIcon);

	let content: ToastrConfig;

	let icon = icons.get('info');

	$: icon = icons.get(content?.type ?? 'info');

	notifierService.notifier.subscribe((toastr) => {
		if (toastr) {
			content = toastr;
		}
	});
</script>

{#if content?.isShown}
	<Toast
		color={content.currentColor}
		transition={fly}
		params={{ x: 200 }}
		open={content.isShown}
		simple
		position="top-right"
	>
		<svelte:fragment slot="icon">
			<svelte:component this={icon} />
		</svelte:fragment>

		<div class="inline-flex justify-between items-center w-full">
			<p>
				<span class="font-medium">
					{content?.title}
				</span>

				{content?.message}
			</p>

			<button
				on:click={() => notifierService.closeToastr()}
				type="button"
				class="inline-flex items-center p-0.5 ml-2 text-sm bg-transparent rounded-sm text-blue-400 hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300"
				aria-label="Remove"
			>
				<CloseIcon />
			</button>
		</div>
	</Toast>
{/if}
