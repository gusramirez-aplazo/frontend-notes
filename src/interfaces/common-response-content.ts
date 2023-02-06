export class CommonResponseContent {
	[key: string]: string | number | undefined;
	name: string;
	description: string;
	createdAt?: string;
	updatedAt?: string;
	deletedAt?: string;
}
