import { toastr } from '$lib/modules/notifier/store/toastr';
import { ToastrConfig } from '../entities';

export class ToastrService {
	static closeToastr(): void {
		toastr.update((val) => {
			const config = ToastrConfig.create({
				title: val.title,
				message: val.message,
				isShown: false,
				type: 'info'
			});

			return config;
		});
	}

	static success(title: string, message: string): void {
		const config = ToastrConfig.create({
			title,
			message,
			isShown: true,
			type: 'success'
		});

		toastr.set(config);
	}
	static error(title: string, message: string): void {
		const config = ToastrConfig.create({
			title,
			message,
			isShown: true,
			type: 'error'
		});

		toastr.set(config);
	}
	static warning(title: string, message: string): void {
		const config = ToastrConfig.create({
			title,
			message,
			isShown: true,
			type: 'warning'
		});

		toastr.set(config);
	}
	static info(title: string, message: string): void {
		const config = ToastrConfig.create({
			title,
			message,
			isShown: true,
			type: 'info'
		});

		toastr.set(config);
	}
}
