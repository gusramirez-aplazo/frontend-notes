<script>
	import LinkIcon from '$lib/shared/components/link-icon.svelte';
	import { Button, Card } from 'flowbite-svelte';
</script>

<main class="flex flex-col w-full min-h-screen items-center pt-12">
	<section class="min-h-[450px]">
		<Card class="">
			<article class="mb-10 flex flex-col items-center">
				<h5
					class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
				>
					Simple Cornell Notes
				</h5>
				<p
					class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight"
				>
					Take advantage of the Cornell Notes method to take notes and organize
					your thoughts.
				</p>
				<a
					href="/note"
					class="inline-flex items-center text-blue-600 dark:text-blue-300 hover:underline"
				>
					Start to write
					<LinkIcon />
				</a>
			</article>

			<article class="mb-10 flex flex-col items-center">
				<h6
					class="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white"
				>
					Search for notes
				</h6>

				<form>
					<input
						type="text"
						class="w-full px-4 py-2 mb-3 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
						placeholder="Search for notes"
					/>
					<Button type="submit" color="blue" class="w-full">Search</Button>
				</form>
			</article>
		</Card>
	</section>
</main>
