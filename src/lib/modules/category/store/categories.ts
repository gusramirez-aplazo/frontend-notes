import { writable } from 'svelte/store';
import type { CategoryStore } from '../entities';

const initialState: CategoryStore = {
	selected: null,
	retrievedCategories: []
};

export const categories = writable<CategoryStore>(initialState);
