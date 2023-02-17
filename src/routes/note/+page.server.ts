import axios from 'axios';

import { env } from '$env/dynamic/private';
import { fail, type Actions, type RequestEvent } from '@sveltejs/kit';
import type { BaseItemDetail } from '$lib/shared/entities/base-item-detail';
import type { ApiResponse } from '$lib/shared/entities/api-response';
import type { PageServerLoad } from './$types';

const baseUrl = env.API_BASE_URL;

const httpClient = axios.create({
	baseURL: baseUrl,
	headers: {
		'Content-Type': 'application/json'
	}
});

export const load: PageServerLoad = async () => {
	const resp = await Promise.allSettled([
		httpClient<ApiResponse<BaseItemDetail[]>>({
			url: '/api/v1/category',
			method: 'GET'
		})
	]);

	const [categoriesResponse] = resp.map((resp) => {
		if (resp.status !== 'fulfilled') {
			return {
				success: false,
				message: resp.reason,
				content: []
			};
		}

		if (resp.value.data.success) {
			return resp.value.data;
		}

		return {
			success: false,
			message: resp.value.data.message,
			content: []
		};
	});

	return {
		...categoriesResponse
	};
};

export const actions: Actions = {
	createCategory: async (event: RequestEvent) => {
		if (!baseUrl) {
			throw new Error('No Base Url for create category');
		}

		const formData = await event.request.formData();

		const category = formData.get('category')?.toString() ?? '';

		if (!category) {
			return fail(400, {
				success: false,
				formContent: { category },
				error: { message: 'Category is required' }
			});
		}

		try {
			const response = await httpClient({
				url: '/api/v1/category',
				method: 'POST',
				data: {
					name: category
				}
			});

			const validStatus = response.status >= 200 && response.status < 300;

			if (!validStatus) {
				throw new Error(response.statusText);
			}

			const data = response.data as ApiResponse<BaseItemDetail>;

			return {
				success: true,
				formContent: { category: '', response: data.content },
				error: null
			};
		} catch (error: any) {
			console.error(error.response.data);

			return fail(500, {
				success: false,
				formContent: { category },
				error: {
					message: error?.response?.data?.message ?? 'Error creating category'
				}
			});
		}
	}
};
