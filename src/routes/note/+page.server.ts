import { env } from '$env/dynamic/private';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const baseUrl = env.API_BASE_URL || 'http://localhost:3000';
	const resp = await Promise.allSettled([
		getItemsByType('subject', baseUrl),
		getItemsByType('category', baseUrl)
	]);

	const [subjects, categories] = resp
		.map((singleResp) => {
			if (singleResp.status === 'fulfilled') {
				return {
					error: false,
					success: true,
					content: Array.isArray(singleResp.value.content) ? singleResp.value : []
				};
			}
			return {
				success: false,
				error: singleResp.status,
				content: []
			};
		})
		.map((response) => {
			if (response.success) {
				return response.content;
			}
			return [];
		});

	return {
		subjects,
		categories
	};
};

const getItemsByType = (type: string, baseUrl: string) => {
	return fetch(`${baseUrl}/api/v1/${type}`)
		.then((res) => res.json())
		.then((data) => data);
};
