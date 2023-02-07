import { env } from '$env/dynamic/private';
import type { PageServerLoad } from './$types';
import type { CommonResponseContent } from '../../interfaces/common-response-content';
import type { ApiResponse } from '../../interfaces/api-response';

export const load: PageServerLoad = async () => {
	const baseUrl = env.API_BASE_URL || 'http://localhost:3000';

	const resp = await Promise.allSettled([
		getItemsByType('subject', baseUrl),
		getItemsByType('category', baseUrl)
	]);

	const [subjects, categories] = resp
		.map((singleResp) => {
			if (singleResp.status === 'fulfilled') {
				return singleResp.value;
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

const getItemsByType = (
	type: string,
	baseUrl: string
): Promise<ApiResponse<CommonResponseContent[]>> => {
	if (!baseUrl) {
		throw new Error('No Base Url for get categories and subjects provided');
	}

	return fetch(`${baseUrl}/api/v1/${type}`)
		.then((res) => res.json() as Promise<ApiResponse<CommonResponseContent[]>>)
		.catch((err) => {
			console.error(err);

			return {
				success: false,
				error: err.message ? err.message : err,
				content: []
			};
		});
};
