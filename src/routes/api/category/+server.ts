import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';
import { createCategory } from '$lib/modules/category/services/category-api-adapter.service';
import { json } from '@sveltejs/kit';

const baseUrl = env.API_BASE_URL || 'http://localhost:3000';

export const POST: RequestHandler = async ({ fetch, request }) => {
	const req = await request.json();

	if (!req?.name) {
		return json({ message: 'No name provided' }, { status: 400 });
	}

	const data = await createCategory(fetch, baseUrl, req.name);

	return json(data, {
		status: 201,
		headers: { 'Content-Type': 'application/json' }
	});
};
