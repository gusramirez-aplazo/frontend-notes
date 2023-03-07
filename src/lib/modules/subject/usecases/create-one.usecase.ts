import {
	CustomRuntimeError,
	ErrorCodes,
	ErrorStatus
} from '$lib/shared/infra/custom-runtime-error';
import type { NotifierServiceType } from '../../notifier/services/tostr-store.service';
import type { SubjectHttpClientServiceType } from '../services/http-subject.service';
import type { BaseItemDetail } from '../../../shared/entities/base-item-detail';

export const createSubjectUsecase = (
	httpClient: SubjectHttpClientServiceType,
	notifier: NotifierServiceType
) => {
	return {
		execute: async function (
			subject: string,
			selectedSubjects: BaseItemDetail[],
			retrivedSubjects: BaseItemDetail[]
		): Promise<{
			selected: BaseItemDetail[];
			retrieved: BaseItemDetail[];
		}> {
			const validatedName = subject?.trim().toLowerCase() ?? '';
			const newRetrievedItems = [...retrivedSubjects];
			const newSelectedItems = [...selectedSubjects];

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
					newSelectedItems.push(item);
					notifier.success('Success', 'Subject created');

					return {
						selected: newSelectedItems,
						retrieved: newRetrievedItems
					};
				}

				notifier.error('Ups!', response.message);
				return {
					selected: newSelectedItems,
					retrieved: newRetrievedItems
				};
			} catch (error: unknown) {
				const selection = newRetrievedItems.findIndex(
					(item) => item.name.toLowerCase() === validatedName
				);

				if (selection >= 0) {
					newSelectedItems.push(newRetrievedItems[selection]);
					newRetrievedItems.splice(selection, 1);
					notifier.info('Subject selected', '');
					return {
						selected: newSelectedItems,
						retrieved: newRetrievedItems
					};
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
