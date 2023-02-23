import {
	CustomRuntimeError,
	ErrorCodes,
	ErrorStatus
} from '$lib/shared/infra/custom-runtime-error';
import type { NotifierServiceType } from '../../notifier/services/tostr-store.service';
import type { CategoryStoreServiceType } from '../services/category-store.service';
import type { CategoryHttpClientServiceType } from '../services/http-category.service';

export const createCategoryUsecase = (
	httpClient: CategoryHttpClientServiceType,
	storeService: CategoryStoreServiceType,
	notifier: NotifierServiceType
) => {
	return {
		execute: async function (form: HTMLFormElement) {
			const data = new FormData(form);

			const name = data.get('category');

			const validatedName = name?.toString().trim().toLowerCase() ?? '';

			if (!validatedName) {
				throw new CustomRuntimeError(
					ErrorCodes.noCategoryName,
					ErrorStatus.badRequest,
					'Category name is required'
				);
			}

			try {
				const response = await httpClient.createOne(validatedName);

				if (response.success) {
					const category = response.content;
					storeService.setNewSelectedCategory(category);
					notifier.success('Success', 'Category created');
					form.reset();
					return;
				}

				notifier.error('Ups!', response.message);
			} catch (error: unknown) {
				console.error(error);

				if (error instanceof CustomRuntimeError) {
					notifier.error(
						'Ups!',
						error.message ??
							error.code ??
							'Error with creation category service'
					);
				} else {
					notifier.error('Ups!', 'Error creating category');
				}

				throw error;
			}
		}
	};
};
