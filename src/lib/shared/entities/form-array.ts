import type { FormControl } from './form-control';

export class FormArray<Content> {
	name: string;
	private _value: FormControl<Content>[] | null;

	constructor(name: string, value: FormControl<Content>[] | null) {
		this.name = name;
		this._value = value;
	}

	public get value(): FormControl<Content>[] {
		return this._value as FormControl<Content>[];
	}

	public set value(value: FormControl<Content>[]) {
		if (
			typeof value === 'undefined' ||
			value === null ||
			!Array.isArray(value) ||
			value.length === 0
		) {
			throw new Error(
				'FormArray value must be an array with at least one element'
			);
		}
		this._value = value;
	}

	public get isTouched(): boolean {
		return this._value?.some((control) => control.isTouched) ?? false;
	}

	public get isValid(): boolean {
		return this._value?.every((control) => control.isValid) ?? false;
	}

	public markAllAsTouched() {
		this._value?.forEach((control) => control.markAsTouched());
		return this;
	}

	public reset(initialValue: FormControl<Content>[]) {
		this.value = initialValue;
		return this;
	}
}
