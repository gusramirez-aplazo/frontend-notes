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

const setInitialLoad = (items: BaseItemDetail[]) => {
	subjects.set({
		selected: [],
		retrieved: items
	});
};

const _subjectStoreService = {
	setNewSelectedSubject,
	setInitialLoad
};

export const SubjectStoreService = Object.freeze(_subjectStoreService);
