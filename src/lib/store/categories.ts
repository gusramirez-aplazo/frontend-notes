import { writable } from 'svelte/store';
import type { CommonResponseContent } from '../../interfaces/common-response-content';

export const category = writable<{
	selection: CommonResponseContent[];
	items: CommonResponseContent[];
}>({
	selection: [],
	items: []
});
