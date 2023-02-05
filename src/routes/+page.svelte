<div class="container">
	<header class="principal-header">
		<div class="principal-header--brand">
			<div class="principal-header--logo">img.main-logo</div>
			<h4 class="principal-header--path">Community mode</h4>
		</div>

		<nav class="principal-nav">
			<ul class="principal-nav--items">
				<li class="principal-nav--item">
					<button class="principal-nav--link"> Login </button>
				</li>
			</ul>
		</nav>
	</header>

	<main class="principal">
		<section class="principal-card">
			<header class="principal-card--header">
				<h1 class="principal-card--title">Notes</h1>
			</header>

			<article class="principal-card--body">
				<header class="body-header">
					<h2 class="body-title">Notebook</h2>
				</header>

				<div class="body-search">
					<label for="search-input" class="search-label"> Find topics </label>
					<input type="text" class="search-input" id="search-input" />
				</div>

				<div class="principal-card--actions">
					<button class="principal-card--action-button"> Take a tour </button>
					<a href="/note" class="principal-card--action-button"> Start to write </a>
				</div>
			</article>
		</section>
	</main>
</div>

<style>
	.principal-header {
		display: flex;
		width: 100%;
		justify-content: space-between;
	}

	.principal-header--brand {
		display: flex;
		column-gap: 1rem;
		align-items: center;
	}

	.principal-header--logo {
		min-width: 100px;
	}

	.principal {
		display: flex;
		justify-content: center;
		padding-top: min(4rem, 15vh);
	}

	.principal-card {
		display: flex;
		flex-direction: column;
		align-items: center;

		row-gap: 1rem;
		width: min(100%, 450px);
		padding: 1.5rem 2rem 2rem;
		border-radius: 12px;
		box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.15), 0 0 6px 2px rgba(0, 0, 0, 0.1);
	}

	.principal-card--body {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		row-gap: 1rem;
	}

	.body-search {
		display: flex;
		flex-direction: column;
	}
</style>
