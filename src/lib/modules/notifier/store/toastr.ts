import { writable } from 'svelte/store';
import type { ToastrConfig } from '../entities';

export const toastr = writable<ToastrConfig>();
