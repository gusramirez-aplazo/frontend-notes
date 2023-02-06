export class ApiResponse<T> {
	content: T;
	error: string;
	success: boolean;
}
