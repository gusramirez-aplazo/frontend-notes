<script lang="ts">
	/** @type {import('./$types').PageData} */
	export let data: { subjects: any[]; categories: any[] } = { subjects: [], categories: [] };
	console.log(data);

	$: subjects = data.subjects;
	$: categories = data.categories;
</script>

<div class="container">
	<main class="note-main">
		<form class="note-form">
			<div class="note-form--header">
				<h1 class="note-form--title">New note</h1>
			</div>

			<div class="note-form--body">
				<div class="form-group">
					<label for="note-title" class="form-input--label">Title</label>
					<input type="text" class="form-input" id="note-title" />
				</div>

				<div class="form-group">
					<label for="category" class="form-input--label">Categories</label>
					<input
						type="text"
						list="datalist-categories"
						class="form-input"
						id="category"
						autocomplete="off"
					/>

					<datalist id="datalist-categories">
						{#each categories as category}
							<option value={category.name} />
						{/each}
					</datalist>
				</div>

				<div class="form-group">
					<label for="subject" class="form-input--label">Subjects</label>
					<input
						type="text"
						class="form-input"
						id="subject"
						list="datalist-subjects"
						autocomplete="off"
					/>

					<datalist id="datalist-subjects">
						{#each subjects as subject}
							<option value={subject.name} />
						{/each}
					</datalist>
				</div>

				<div class="form-group">
					<label for="note-content" class="form-input--label">Content</label>
					<textarea class="form-textarea" id="note-content" />
				</div>
			</div>

			<div class="note-form--footer">
				<button class="note-form--footer--button">Save</button>
			</div>
		</form>
	</main>
</div>
