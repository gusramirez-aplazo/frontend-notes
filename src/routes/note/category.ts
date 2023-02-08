import type { CommonResponseContent } from '../../interfaces/common-response-content';

export class ReactiveData {
	currentSelection: string;
	filteredItems: CommonResponseContent[];
	selectedItems: CommonResponseContent[];
}
