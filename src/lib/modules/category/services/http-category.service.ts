import type { BaseItemDetail } from '$lib/shared/entities/base-item-detail';
import {
	CustomRuntimeError,
	ErrorCodes,
	ErrorStatus
} from '$lib/shared/infra/custom-runtime-error';
import type { ApiResponse } from '../../../shared/entities/api-response';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export type CategoryHttpClientServiceType = {
	createOne: (categoryName: string) => Promise<ApiResponse<BaseItemDetail>>;
};

const _categoryHttpClientService: CategoryHttpClientServiceType = {
	createOne: async function (
		categoryName: string
	): Promise<ApiResponse<BaseItemDetail>> {
		if (!baseUrl) {
			throw new CustomRuntimeError(
				ErrorCodes.noBaseUrl,
				ErrorStatus.emptyStatus,
				'No Base Url for create category'
			);
		}

		if (!categoryName) {
			throw new CustomRuntimeError(
				ErrorCodes.noCategoryName,
				ErrorStatus.emptyStatus,
				'No Category Name for create category'
			);
		}

		const fetchedResponse = await window.fetch(`${baseUrl}/api/v1/category`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: categoryName
			})
		});

		if (!fetchedResponse.ok) {
			throw new CustomRuntimeError(
				ErrorCodes.internalServerError,
				ErrorStatus.internalServerError,
				(await fetchedResponse.json()).message
			);
		}

		const response =
			(await fetchedResponse.json()) as ApiResponse<BaseItemDetail>;

		const validStatus = response.success === true;

		if (!validStatus) {
			throw new CustomRuntimeError(
				ErrorCodes.badRequest,
				ErrorStatus.badRequest,
				response.message
			);
		}

		return {
			success: true,
			content: response.content,
			message: ''
		};
	}
};

export const categoryHttpClientService = Object.freeze(
	_categoryHttpClientService
);
