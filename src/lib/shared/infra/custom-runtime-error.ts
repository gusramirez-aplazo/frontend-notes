export class CustomRuntimeError extends Error {
	name: string;

	code: string;

	status: number;

	constructor(
		code: ErrorCodesType = ErrorCodes.emptyCode,
		status = ErrorStatus.emptyStatus,
		...params: any[]
	) {
		super(...params);

		this.code = code;

		this.status = status;

		this.name = 'CustomRuntimeError';

		// Maintains proper stack trace for where our error was thrown (only available on V8)
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, CustomRuntimeError);
		}

		// 👇️ because we are extending a built-in class
		Object.setPrototypeOf(this, CustomRuntimeError.prototype);
	}
}

export type ErrorCodesType = string;

export const enum ErrorCodes {
	emptyCode = 'n/a',
	noBaseUrl = 'No base Url',
	noCategoryName = 'No Category Name',
	noSubjectName = 'No Subject Name',
	internalServerError = 'Internal Server Error',
	badRequest = 'Bad Request'
}

export const enum ErrorStatus {
	emptyStatus = 500,
	badRequest = 400,
	notFound = 404,
	internalServerError = 500
}
