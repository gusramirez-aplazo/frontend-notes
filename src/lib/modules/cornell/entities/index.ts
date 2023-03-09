import type { ApiResponse } from '$lib/shared/entities/api-response';
import type { BaseItemDetail } from '$lib/shared/entities/base-item-detail';

export interface CornellNoteRequestDto {
	topic: {
		name: string;
	};
	subjects: Array<{
		name: string;
		id: number;
	}>;
	notes: Array<{
		cue: string;
		content: string;
		id: string;
	}>;
}

export type CornellNoteResponseDto = ApiResponse<{
	topic: BaseItemDetail;
	subjects: Array<BaseItemDetail>;
	notes: Array<Omit<BaseItemDetail, 'name'> & { cue: string; content: string }>;
}>;

export interface CornellNoteContentUIDto {
	title: string;
	subjects: Array<BaseItemDetail>;
	selectedSubjects: Array<BaseItemDetail>;
	notes: Array<{ cue: string; content: string }>;
}
