import { json } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

import { env } from '$env/dynamic/private';
import type { ApiResponse } from '../../../interfaces/api-response';
import type { CommonResponseContent } from '../../../interfaces/common-response-content';

const baseUrl = env.API_BASE_URL || 'http://localhost:3000';

export const POST = async (event: RequestEvent): Promise<Response> => {
	const body = await event.request.json();

	try {
		const resp = await fetch(`${baseUrl}/api/v1/subject`, {
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
