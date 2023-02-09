import { writable } from 'svelte/store';
export const toastr = writable<{
	title: string;
	message: string;
	type?: 'success' | 'error' | 'info' | 'warning';
	isShown: boolean;
}>();
