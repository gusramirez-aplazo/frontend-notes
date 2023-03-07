import type { Writable } from 'svelte/store';
import type { CornellNote } from '../entities';
import { cornellNotes } from '../store/cornell';

export type CornellNoteStoreServiceType = {
	cornellNotes: Writable<CornellNote[]>;
	addNote(note: CornellNote): void;
	updateNote(note: CornellNote): void;
	removeNote(note: CornellNote): void;
};

class CornellNoteStoreService implements CornellNoteStoreServiceType {
	private readonly _cornellNotes = cornellNotes;

	public get cornellNotes() {
		return this._cornellNotes;
	}

	public addNote(note: CornellNote): void {
		this._cornellNotes.update((val) => {
			return [...val, note];
		});
	}

	public updateNote(note: CornellNote): void {
		this._cornellNotes.update((val) => {
			const newItems = [...val];
			const index = newItems.findIndex((n) => n.id === note.id);

			if (index >= 0) {
				newItems.splice(index, 1, note);
			}

			return newItems;
		});
	}

	public removeNote(note: CornellNote): void {
		this._cornellNotes.update((val) => {
			return val.filter((n) => n.id !== note.id);
		});
	}
}

const _cornellNoteStoreService = new CornellNoteStoreService();

export const cornellNoteStoreService = Object.freeze(_cornellNoteStoreService);
