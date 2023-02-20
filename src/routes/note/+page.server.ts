import { env } from '$env/dynamic/private';
import { fail, type Actions, type RequestEvent } from '@sveltejs/kit';
import type { BaseItemDetail } from '$lib/shared/entities/base-item-detail';
import type { ApiResponse } from '$lib/shared/entities/api-response';
import type { PageServerLoad } from './$types';

const baseUrl = env.API_BASE_URL;

export const load: PageServerLoad = (async ({ fetch }) => {
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
}) satisfies PageServerLoad;

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
			const fetchedResponse = await event.fetch(`${baseUrl}/api/v1/category`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name: category.trim().toLowerCase()
				})
			});

			const response =
				(await fetchedResponse.json()) as ApiResponse<BaseItemDetail>;

			const validStatus = response.success === true;

			if (!validStatus) {
				return fail(400, {
					success: false,
					formContent: { category },
					error: { message: response.message }
				});
			}

			return {
				success: true,
				formContent: { category: '', response: response.content },
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
