import type { BaseItemDetail } from '$lib/shared/entities/base-item-detail';
import {
	CustomRuntimeError,
	ErrorCodes,
	ErrorStatus
} from '$lib/shared/infra/custom-runtime-error';
import type { ApiResponse } from '../../../shared/entities/api-response';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export type SubjectHttpClientServiceType = {
	createOne: (name: string) => Promise<ApiResponse<BaseItemDetail>>;
};

const _httpClientService: SubjectHttpClientServiceType = {
	createOne: async function (
		name: string
	): Promise<ApiResponse<BaseItemDetail>> {
		if (!baseUrl) {
			throw new CustomRuntimeError(
				ErrorCodes.noBaseUrl,
				ErrorStatus.emptyStatus,
				'No Base Url for create subject'
			);
		}

		if (!name) {
			throw new CustomRuntimeError(
				ErrorCodes.noSubjectName,
				ErrorStatus.emptyStatus,
				'No Field Name for create subject'
			);
		}

		const fetchedResponse = await window.fetch(`${baseUrl}/api/v1/subject`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: name
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

export const subjectHttpClientService = Object.freeze(_httpClientService);
