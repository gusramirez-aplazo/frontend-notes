import {
	CustomRuntimeError,
	ErrorCodes,
	ErrorStatus
} from '$lib/shared/infra/custom-runtime-error';
import type { NotifierServiceType } from '../../notifier/services/tostr-store.service';
import type { SubjectHttpClientServiceType } from '../services/http-subject.service';
import type { SubjectStoreServiceType } from '../services/subject-store.service';

export const createSubjectUsecase = (
	httpClient: SubjectHttpClientServiceType,
	storeService: SubjectStoreServiceType,
	notifier: NotifierServiceType
) => {
	return {
		execute: async function (form: HTMLFormElement) {
			const data = new FormData(form);

			const name = data.get('subject');

			const validatedName = name?.toString().trim().toLowerCase() ?? '';

			if (!validatedName) {
				throw new CustomRuntimeError(
					ErrorCodes.noSubjectName,
					ErrorStatus.badRequest,
					'Subject name is required'
				);
			}

			try {
				const response = await httpClient.createOne(validatedName);

				if (response.success) {
					const item = response.content;
					storeService.setNewSelection(item);
					notifier.success('Success', 'Subject created');
					form.reset();
					return;
				}

				notifier.error('Ups!', response.message);
			} catch (error: unknown) {
				const selection = storeService.getSelectedItemByName(validatedName);

				if (selection) {
					storeService.setNewSelection(selection);
					notifier.info('Subject selected', '');
					form.reset();
					return;
				}

				console.error(error);

				if (error instanceof CustomRuntimeError) {
					notifier.error(
						'Ups!',
						error.message ?? error.code ?? 'Error with creation subject service'
					);
				} else {
					notifier.error('Ups!', 'Error creating subject');
				}

				throw error;
			}
		}
	};
};
