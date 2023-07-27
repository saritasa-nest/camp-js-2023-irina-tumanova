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
	public transform(value: string): string {
		return `${value[0].toUpperCase()}${value.slice(1).toLowerCase()}`;
	}
}
