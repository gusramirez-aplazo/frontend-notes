import { json } from '@sveltejs/kit';
import type { RequestEvent } from '../../../.svelte-kit/types/src/routes/note/$types';
import type { ApiResponse } from '../../interfaces/api-response';
import type { CommonResponseContent } from '../../interfaces/common-response-content';

export const postMethodFactory =
	(endpoint: string) =>
	async ({ request, fetch }: RequestEvent): Promise<Response> => {
		const body = await request.json();

		try {
			const resp = await fetch(endpoint, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ name: body.name })
			});

			const data = (await resp.json()) as Promise<ApiResponse<CommonResponseContent[]>>;

			return json(data);
		} catch (error: any) {
			console.error(error);

			return json({
				success: false,
				error: error.message ? error.message : error,
				content: null
			});
		}
	};
