import type { BaseItemDetail } from '$lib/shared/entities/base-item-detail';

export class SubjectStore {
	public selected: BaseItemDetail[];
	public retrieved: BaseItemDetail[];
}
