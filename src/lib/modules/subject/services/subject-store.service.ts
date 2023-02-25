import type { BaseItemDetail } from '$lib/shared/entities/base-item-detail';
import { get, type Writable } from 'svelte/store';
import { subjects } from '../store/subjects';
import type { SubjectStore } from '../entities';

export type SubjectStoreServiceType = {
	subjects: Writable<SubjectStore>;
	setNewSelection: (subject: BaseItemDetail) => void;
	getSelectedItemByName: (name: string) => BaseItemDetail | null;
	removeSelection: (subject: BaseItemDetail) => void;
	setInitialLoad: (items: BaseItemDetail[]) => void;
};

class SubjectStoreService implements SubjectStoreServiceType {
	private readonly _subjects = subjects;

	public get subjects() {
		return this._subjects;
	}

	public setNewSelection(item: BaseItemDetail): void {
		this._subjects.update((val) => {
			const selected = item;
			const retrieved = [...val.retrieved];

			const findedIndex = retrieved.findIndex((item) => item.id === item.id);

			if (findedIndex === -1) {
				return {
					selected: [...val.selected, selected],
					retrieved: retrieved
				};
			}

			return {
				selected: [...val.selected, selected],
				retrieved: retrieved.filter((item) => item.id !== selected.id)
			};
		});
	}

	public getSelectedItemByName(name: string): BaseItemDetail | null {
		const selected = get(this._subjects).retrieved.find((i) => i.name === name);

		return selected ?? null;
	}

	public setInitialLoad(items: BaseItemDetail[]): void {
		this._subjects.set({
			selected: [],
			retrieved: items
		});
	}

	public removeSelection(item: BaseItemDetail): void {
		subjects.update((val) => {
			const selected = [...val.selected];
			const retrieved = [...val.retrieved];

			const findedIndex = selected.findIndex((s) => s.id === item.id);

			if (findedIndex === -1) {
				return {
					selected,
					retrieved
				};
			}

			selected.splice(findedIndex, 1);
			retrieved.push(item);

			return {
				selected,
				retrieved
			};
		});
	}
}

const _subjectStoreService = new SubjectStoreService();

export const subjectStoreService = Object.freeze(_subjectStoreService);
