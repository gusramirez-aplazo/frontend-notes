import type { ApiResponse } from '../../interfaces/api-response';
import type { CommonResponseContent } from '../../interfaces/common-response-content';

export const createGroupingContent = (
	endpoint: string,
	name: string
): Promise<ApiResponse<CommonResponseContent>> => {
	return fetch(`/api/${endpoint}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ name })
	})
		.then((res) => res.json())
		.catch((err) => {
			console.warn(err);
			throw err;
		});
};
