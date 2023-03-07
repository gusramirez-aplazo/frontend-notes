import { writable } from 'svelte/store';
import { CornellNote } from '../entities';

export const initialState: CornellNote[] = [CornellNote.create('', '')];

export const cornellNotes = writable(initialState);
