export type ToastrType = 'success' | 'info' | 'warning' | 'error';

export const toastrColor = new Map<
	string,
	| 'form'
	| 'gray'
	| 'red'
	| 'yellow'
	| 'green'
	| 'indigo'
	| 'default'
	| 'purple'
	| 'pink'
	| 'blue'
	| 'light'
	| 'dark'
	| 'dropdown'
	| 'navbar'
	| 'navbarUl'
	| 'none'
	| undefined
>();

toastrColor.set('success', 'green');

toastrColor.set('error', 'red');

toastrColor.set('warning', 'yellow');

toastrColor.set('info', 'blue');

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
	public currentColor:
		| 'form'
		| 'gray'
		| 'red'
		| 'yellow'
		| 'green'
		| 'indigo'
		| 'default'
		| 'purple'
		| 'pink'
		| 'blue'
		| 'light'
		| 'dark'
		| 'dropdown'
		| 'navbar'
		| 'navbarUl'
		| 'none'
		| undefined;

	private constructor(
		title: string,
		message: string,
		isShown: boolean,
		type: ToastrType,
		color:
			| 'form'
			| 'gray'
			| 'red'
			| 'yellow'
			| 'green'
			| 'indigo'
			| 'default'
			| 'purple'
			| 'pink'
			| 'blue'
			| 'light'
			| 'dark'
			| 'dropdown'
			| 'navbar'
			| 'navbarUl'
			| 'none'
			| undefined
	) {
		this.title = title;
		this.message = message;
		this.isShown = isShown;
		this.type = type;
		this.currentColor = color;
	}

	public static create(params: IToastrParams): ToastrConfig {
		const type = params.type ?? 'info';
		const color = toastrColor.get(type) ?? 'dark';

		return new ToastrConfig(
			params.title,
			params.message,
			params.isShown || false,
			type,
			color
		);
	}
}
