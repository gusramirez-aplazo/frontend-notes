import type { ApiResponse } from '$lib/shared/entities/api-response';
import type { BaseItemDetail } from '$lib/shared/entities/base-item-detail';
import type { FetchType } from '$lib/shared/entities/fetch';

export const retrieveCategories = async (fetch: FetchType, baseUrl: string) => {
	if (!baseUrl) {
		throw new Error('No Base Url for get categories');
	}

	return fetch(`${baseUrl}/api/v1/category`)
		.then((res) => res.json() as Promise<ApiResponse<BaseItemDetail[]>>)
		.catch((err: ApiResponse<null>) => {
			return {
				success: false,
				message: err.message ? err.message : err,
				content: []
			};
		});
};

export const createCategory = async (
	fetch: FetchType,
	baseUrl: string,
	name: string
) => {
	if (!baseUrl) {
		throw new Error('No Base Url for create category');
	}

	const body = {
		name
	};

	return fetch(`${baseUrl}/api/v1/category`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	})
		.then((res) => res.json() as Promise<ApiResponse<BaseItemDetail>>)
		.catch((err: ApiResponse<null>) => {
			return {
				success: false,
				message: err.message ? err.message : err,
				content: null
			};
		});
};
