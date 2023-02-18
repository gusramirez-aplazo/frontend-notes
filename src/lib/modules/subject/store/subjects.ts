import { writable } from 'svelte/store';
import type { SubjectStore } from '../entities';

const initialState: SubjectStore = {
	selected: [],
	retrieved: []
};

export const subjects = writable<SubjectStore>(initialState);
