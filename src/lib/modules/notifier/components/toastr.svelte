<script lang="ts">
	import { Alert } from 'flowbite-svelte';
	import { toastr } from '$lib/modules/notifier/store/toastr';
	import { ToastrService } from '../services/tostr-store.service';

	import type { ToastrConfig } from '../entities';

	import InfoIcon from '$lib/shared/components/info-icon.svelte';

	let content: ToastrConfig;

	toastr.subscribe((toastr) => {
		if (toastr) {
			content = toastr;
		}
	});
</script>

{#if content?.isShown}
	<Alert
		class="fixed top-1 right-1 w-fit max-w-xs"
		color={content.currentColor ?? ''}
		on:close={ToastrService.closeToastr}
		dismissable
	>
		<span slot="icon">
			<InfoIcon />
		</span>

		<span class="font-medium">
			{content?.title}
		</span>

		{content?.message}
	</Alert>
{/if}
