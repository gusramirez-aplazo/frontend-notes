import type { BaseItemDetail } from '$lib/shared/entities/base-item-detail';

export class CategoryStore {
	public selected: BaseItemDetail | null;
	public retrievedCategories: BaseItemDetail[];
}
