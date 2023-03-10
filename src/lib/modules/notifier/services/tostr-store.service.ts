import { toastr } from '$lib/modules/notifier/store/toastr';
import { ToastrConfig } from '../entities';

export type NotifierServiceType = {
	notifier: typeof toastr;
	closeToastr: () => void;
	success: (title: string, message: string) => void;
	error: (title: string, message: string) => void;
	warning: (title: string, message: string) => void;
	info: (title: string, message: string) => void;
};

class NotifierService implements NotifierServiceType {
	private readonly _notifier = toastr;

	private counterId: any;

	public get notifier() {
		return this._notifier;
	}

	public closeToastr(): void {
		if (this.counterId) {
			globalThis.clearTimeout(this.counterId);
		}
		this.setNotifier({ isShown: false });
	}

	public success(title: string, message: string): void {
		this.setNotifier({ type: 'success', title, message });
	}

	public error(title: string, message: string): void {
		this.setNotifier({ type: 'error', title, message });
	}

	public warning(title: string, message: string): void {
		this.setNotifier({ type: 'warning', title, message });
	}

	public info(title: string, message: string): void {
		this.setNotifier({ type: 'info', title, message });
	}

	private setNotifier({
		type = 'info',
		title = '',
		message = '',
		isShown = true
	}: Partial<ToastrConfig>): void {
		if (this.counterId) {
			globalThis.clearTimeout(this.counterId);
		}

		const config = ToastrConfig.create({
			title,
			message,
			isShown,
			type
		});

		this.counterId = globalThis.setTimeout(() => {
			this.closeToastr();
		}, 4000);

		this._notifier.set(config);
	}
}

export const notifierService = new NotifierService();
