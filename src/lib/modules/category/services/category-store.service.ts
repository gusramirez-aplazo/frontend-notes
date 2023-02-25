import type { BaseItemDetail } from '$lib/shared/entities/base-item-detail';
import type { Writable } from 'svelte/store';
import { categories } from '../store/categories';
import type { CategoryStore } from '../entities';

export type CategoryStoreServiceType = {
	categories: Writable<CategoryStore>;
	setNewSelection: (category: BaseItemDetail) => void;
	setInitialLoad: (items: BaseItemDetail[]) => void;
};

class CategoryStoreService implements CategoryStoreServiceType {
	private readonly _categories = categories;

	public get categories() {
		return this._categories;
	}

	public setNewSelection(category: BaseItemDetail): void {
		this._categories.update((val) => {
			const selected = category;
			const retrieved = [...val.retrievedCategories];

			const findedIndex = retrieved.findIndex(
				(item) => item.id === category.id
			);

			if (findedIndex === -1) {
				return {
					selected,
					retrievedCategories: [...retrieved, category]
				};
			}

			return {
				selected,
				retrievedCategories: retrieved
			};
		});
	}
	public setInitialLoad(items: BaseItemDetail[]) {
		const uncategorized = items.find((item) => item.name === 'uncategorized');

		this._categories.set({
			selected: uncategorized ?? null,
			retrievedCategories: items
		});
	}
}

const _categoryStoreService = new CategoryStoreService();

export const categoryStoreService = Object.freeze(_categoryStoreService);
