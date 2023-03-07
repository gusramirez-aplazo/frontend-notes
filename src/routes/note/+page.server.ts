import { env } from '$env/dynamic/private';
import type { BaseItemDetail } from '$lib/shared/entities/base-item-detail';
import type { ApiResponse } from '$lib/shared/entities/api-response';
import type { PageServerLoad } from './$types';

const baseUrl = env.API_BASE_URL;

export const load: PageServerLoad = async ({ fetch }) => {
	const response = await fetch(`${baseUrl}/api/v1/subject`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	if (!response.ok) {
		return {
			success: false,
			message: response.statusText,
			content: []
		};
	}

	const data = (await response.json()) as ApiResponse<BaseItemDetail[]>;

	if (data.success) {
		return data;
	}

	return {
		success: false,
		message: data.message,
		content: []
	};
};
