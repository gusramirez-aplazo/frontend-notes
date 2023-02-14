import { env } from '$env/dynamic/private';
import { retrieveCategories } from '$lib/modules/category/services/category-api-adapter.service';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const baseUrl = env.API_BASE_URL || 'http://localhost:3000';

	const resp = await Promise.allSettled([retrieveCategories(fetch, baseUrl)]);

	const [categoriesResponse] = resp.map((resp) => {
		if (resp.status !== 'fulfilled') {
			return {
				success: false,
				message: resp.status,
				content: []
			};
		}

		if (resp.value.success) {
			return resp.value;
		}

		return {
			success: false,
			message: resp.value.message,
			content: []
		};
	});

	return {
		...categoriesResponse
	};
};
