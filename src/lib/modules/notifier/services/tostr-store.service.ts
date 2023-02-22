import { toastr } from '$lib/modules/notifier/store/toastr';
import { ToastrConfig } from '../entities';

export type NotifierServiceType = {
	closeToastr: () => void;
	success: (title: string, message: string) => void;
	error: (title: string, message: string) => void;
	warning: (title: string, message: string) => void;
	info: (title: string, message: string) => void;
};

class NotifierService implements NotifierServiceType {
	private readonly _toastr = toastr;

	public closeToastr(): void {
		this._toastr.update((val) => {
			const config = ToastrConfig.create({
				title: val.title,
				message: val.message,
				isShown: false,
				type: 'info'
			});

			return config;
		});
	}

	public success(title: string, message: string): void {
		const config = ToastrConfig.create({
			title,
			message,
			isShown: true,
			type: 'success'
		});

		this._toastr.set(config);
	}
	public error(title: string, message: string): void {
		const config = ToastrConfig.create({
			title,
			message,
			isShown: true,
			type: 'error'
		});

		this._toastr.set(config);
	}
	public warning(title: string, message: string): void {
		const config = ToastrConfig.create({
			title,
			message,
			isShown: true,
			type: 'warning'
		});

		this._toastr.set(config);
	}
	public info(title: string, message: string): void {
		const config = ToastrConfig.create({
			title,
			message,
			isShown: true,
			type: 'info'
		});

		this._toastr.set(config);
	}
}

export const notifierService = new NotifierService();
