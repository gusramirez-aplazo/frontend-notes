import type { BaseItemDetail } from '$lib/shared/entities/base-item-detail';
import { subjects } from '../store/subjects';

const setNewSelectedSubject = (subject: BaseItemDetail) => {
	subjects.update((val) => {
		const retrieved = [...val.retrieved];

		const findedIndex = retrieved.findIndex((item) => item.id === subject.id);

		if (findedIndex === -1) {
			return {
				selected: [...val.selected, subject],
				retrieved: [...retrieved, subject]
			};
		}

		return {
			selected: [...val.selected, subject],
			retrieved
		};
	});
};

const removeSelectedSubject = (subject: BaseItemDetail) => {
	subjects.update((val) => {
		const selected = [...val.selected];
		const retrieved = [...val.retrieved];

		const findedIndex = selected.findIndex((item) => item.id === subject.id);

		if (findedIndex === -1) {
			return {
				selected,
				retrieved
			};
		}

		selected.splice(findedIndex, 1);

		return {
			selected,
			retrieved
		};
	});
};

const getFromRetrieved = (name: string) => {};

const setInitialLoad = (items: BaseItemDetail[]) => {
	subjects.set({
		selected: [],
		retrieved: items
	});
};

const _subjectStoreService = {
	setNewSelectedSubject,
	removeSelectedSubject,
	setInitialLoad
};

export const SubjectStoreService = Object.freeze(_subjectStoreService);
