import type { NotifierServiceType } from '$lib/modules/notifier/services/tostr-store.service';
import { CustomRuntimeError } from '$lib/shared/infra/custom-runtime-error';
import type { CornellHttpClientServiceType } from '../services/http-cornell.service';

export const createCornellNoteUsecase = (
	httpClient: CornellHttpClientServiceType,
	notifier: NotifierServiceType
) => {
	return {
		execute: async function (
			topic: string,
			subjects: Array<{
				name: string;
				id: number;
			}>,
			notes: Array<{
				cue: string;
				content: string;
			}>
		): Promise<any> {
			const validatedTopic = topic?.trim().toLowerCase() ?? '';
			if (!validatedTopic) {
				notifier.error('Ups!', 'Topic is required');
				return;
			}

			const isValidSubjects = subjects?.length > 0;
			if (!isValidSubjects) {
				notifier.error('Ups!', 'At least one subject is required');
				return;
			}

			const isValidNotes = notes?.length > 0;
			if (!isValidNotes) {
				notifier.error('Ups!', 'At least one note is required');
				return;
			}

			try {
				const response = await httpClient.createOne({
					topic: { name: validatedTopic },
					subjects,
					notes
				});

				if (response.success) {
					const item = response.content;

					notifier.success('Success', 'Subject created');

					return {
						...item
					};
				}

				notifier.error('Ups!', response.message);

				return null;
			} catch (error) {
				console.error(error);

				if (error instanceof CustomRuntimeError) {
					notifier.error(
						'Ups!',
						error.message ??
							error.code ??
							'Error with cornell note creation service'
					);
				} else {
					notifier.error('Ups!', 'Error creating cornell note');
				}

				throw error;
			}
		}
	};
};
