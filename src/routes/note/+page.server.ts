import { env } from '$env/dynamic/private';
import type { BaseItemDetail } from '$lib/shared/entities/base-item-detail';
import type { ApiResponse } from '$lib/shared/entities/api-response';
import type { PageServerLoad } from './$types';

const baseUrl = env.API_BASE_URL;

export const load: PageServerLoad = async ({ fetch }) => {
	const settledResponse = await Promise.allSettled([
		fetch(`${baseUrl}/api/v1/category`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((response) => response.json()) as Promise<
			ApiResponse<BaseItemDetail[]>
		>,
		fetch(`${baseUrl}/api/v1/subject`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((response) => response.json()) as Promise<
			ApiResponse<BaseItemDetail[]>
		>
	]);

	const [categoriesResponse, subjectsResponse] = settledResponse.map((resp) => {
		if (resp.status === 'rejected') {
			return {
				success: false,
				message: "can't retrieve data",
				content: []
			};
		}

		const response = { ...resp?.value };

		if (!response) {
			return {
				success: false,
				message: 'Empty response',
				content: []
			};
		}

		if (response.success) {
			return response;
		}

		return {
			success: false,
			message: response.message,
			content: []
		};
	});

	return {
		categoriesResponse,
		subjectsResponse
	};
};
