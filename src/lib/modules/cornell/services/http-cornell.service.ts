import {
	CustomRuntimeError,
	ErrorCodes,
	ErrorStatus
} from '$lib/shared/infra/custom-runtime-error';
import type {
	CornellNoteRequestDto,
	CornellNoteResponseDto
} from '../entities';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export type CornellHttpClientServiceType = {
	createOne: (
		request: CornellNoteRequestDto
	) => Promise<CornellNoteResponseDto>;
};

const _httpClientService: CornellHttpClientServiceType = {
	createOne: async function (
		request: CornellNoteRequestDto
	): Promise<CornellNoteResponseDto> {
		if (!baseUrl) {
			throw new CustomRuntimeError(
				ErrorCodes.noBaseUrl,
				ErrorStatus.emptyStatus,
				'No Base Url for create subject'
			);
		}

		if (!request.topic || !request.subjects?.length || !request.notes?.length) {
			throw new CustomRuntimeError(
				ErrorCodes.badRequest,
				ErrorStatus.badRequest,
				'Bad Request for create cornell note'
			);
		}

		const fetchedResponse = await window.fetch(`${baseUrl}/api/v1/cornell`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				...request
			})
		});

		if (!fetchedResponse.ok) {
			throw new CustomRuntimeError(
				ErrorCodes.internalServerError,
				ErrorStatus.internalServerError,
				(await fetchedResponse.json()).message
			);
		}

		const response = (await fetchedResponse.json()) as CornellNoteResponseDto;

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

export const cornellHttpClientService = Object.freeze(_httpClientService);
