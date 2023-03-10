import type { FormControl } from './form-control';

export class FormArray<Content> {
	name: string;
	private _value: FormControl<Content>[] | null;
}
