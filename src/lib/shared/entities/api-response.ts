export class ApiResponse<T> {
	content: T;
	message: string;
	success: boolean;
}
