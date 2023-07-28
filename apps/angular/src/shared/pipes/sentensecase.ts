import { Pipe, PipeTransform } from '@angular/core';

/**
 * Transform string to sentense format.
 * @example to lONg titLe -> To long title.
 */
@Pipe({
	name: 'sentensecase',
	pure: false,
})
export class SenternseCasePipe implements PipeTransform {

	/** @inheritdoc */
	public transform(value: string | null): string {
		if (value === null || value.length === 0) {
			return '';
		}
		return `${value[0].toUpperCase()}${value.slice(1).toLowerCase()}`;
	}
}
