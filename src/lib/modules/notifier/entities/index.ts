export type ToastrType = 'success' | 'info' | 'warning' | 'error';

export const toastrColor = new Map<string, string>();

toastrColor.set('success', 'green');

toastrColor.set('error', 'red');

toastrColor.set('warning', 'yellow');

toastrColor.set('info', '');

export interface IToastrParams {
	title: string;
	message: string;
	type: ToastrType;
	isShown?: boolean;
}

export class ToastrConfig {
	public title: string;
	public message: string;
	public isShown: boolean;
	public type: ToastrType;
	public currentColor: string;

	private constructor(
		title: string,
		message: string,
		isShown: boolean,
		type: ToastrType,
		color: string
	) {
		this.title = title;
		this.message = message;
		this.isShown = isShown;
		this.type = type;
		this.currentColor = color;
	}

	public static create(params: IToastrParams): ToastrConfig {
		const type = params.type ?? 'info';
		const color = toastrColor.get(type) ?? 'info';

		return new ToastrConfig(
			params.title,
			params.message,
			params.isShown || false,
			type,
			color
		);
	}
}
