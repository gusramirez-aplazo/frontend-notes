export type FormControlEvent<Content> = {
	value: Content;
	isTouched: boolean;
	isValid: boolean;
	errors: { [key: string]: string } | null;
};

export class FormControl<Content> {
	name: string;
	private _value: Content | null;
	private _isTouched: boolean;
	private _isValid: boolean;
	private _errors: { [key: string]: string } | null;

	constructor(name: string, value: Content) {
		this.name = name;
		this.value = value;
		this._isTouched = false;
	}

	public get value(): Content {
		return this._value as Content;
	}

	public set value(value: Content) {
		this._value = value;
		this.setIsValid();
		if (!this._isTouched) {
			this._isTouched = true;
		}
	}

	public markAsTouched() {
		this.value = this._value as Content;
		this._isTouched = true;
		this.setIsValid();
		return this;
	}

	public get isTouched(): boolean {
		return this._isTouched;
	}

	public get isValid(): boolean {
		return this._isValid;
	}

	public get errors(): { [key: string]: string } | null {
		return this._errors;
	}

	public set errors(errors: { [key: string]: string } | null) {
		this._errors = errors;
	}

	public reset(): void {
		this._value = null;
		this._isTouched = false;
		this._isValid = false;
		this._errors = null;
	}

	public getEvent(): FormControlEvent<Content> {
		return {
			value: this.value,
			isTouched: this.isTouched,
			isValid: this.isValid,
			errors: this.errors
		};
	}

	private setIsValid(): void {
		const validation =
			typeof this.value !== 'undefined' &&
			this.value !== null &&
			((Array.isArray(this.value) && this.value.length > 0) ||
				(typeof this.value === 'string' && this.value !== ''));
		if (!validation) {
			this._errors = {
				required: 'This field is required'
			};
		} else {
			this._errors = null;
		}
		this._isValid = validation;
	}
}
