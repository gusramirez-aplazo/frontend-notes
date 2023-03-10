export class FormControl<Content> {
	name: string;
	private _value: Content | null;
	private _isTouched: boolean;
	private _isValid: boolean;
	private _errors: { [key: string]: string } | null;
	private _keyToValidate: string;

	constructor(name: string, value: Content, keyToValidate = '') {
		this.name = name;
		this.value = value;
		this._keyToValidate = keyToValidate;
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

	public reset(initialValue: Content) {
		this.value = initialValue;
		this._isTouched = false;
		this._isValid = false;
		this._errors = null;
		return this;
	}

	private setIsValid(): void {
		let validation = false;

		if (typeof this.value === 'string' && this.value.length > 0) {
			validation = true;
		}

		if (Array.isArray(this.value)) {
			let isValid = false;

			if (this.value.length > 0) {
				isValid = this.value.every((item) => {
					return (
						typeof item[this._keyToValidate] !== 'undefined' &&
						item[this._keyToValidate] !== null &&
						item[this._keyToValidate] !== ''
					);
				});
			}

			validation = isValid;
		}

		this._isValid = validation;

		if (!validation) {
			this._errors = {
				required: 'This field is required'
			};
		} else {
			this._errors = null;
		}
	}
}
