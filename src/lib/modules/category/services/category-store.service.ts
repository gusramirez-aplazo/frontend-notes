import type { BaseItemDetail } from '$lib/shared/entities/base-item-detail';
import { categories } from '../store/categories';

const setNewSelectedCategory = (category: BaseItemDetail) => {
	categories.update((val) => {
		const selected = category;
		const retrieved = [...val.retrievedCategories];

		const findedIndex = retrieved.findIndex((item) => item.id === category.id);

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
};

const setInitialLoad = (items: BaseItemDetail[]) => {
	const uncategorized = items.find((item) => item.name === 'uncategorized');

	categories.set({
		selected: uncategorized ?? null,
		retrievedCategories: items
	});
};

const _categoryStoreService = {
	setNewSelectedCategory,
	setInitialLoad
};

export const CategoryStoreService = Object.freeze(_categoryStoreService);
