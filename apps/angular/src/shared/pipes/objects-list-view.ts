import { Pipe, PipeTransform } from '@angular/core';

/**
 * Transform string to sentense format.
 * @example to lONg titLe -> To long title.
 */
@Pipe({
	name: 'objectsListView',
	pure: false,
})
export class ObjectsListViewPipe implements PipeTransform {

	/** @inheritdoc */
	public transform<T>(array: readonly T[] | null, key: keyof T): string {
		if (array === null || array.length === 0) {
			return '';
		}
		return array.map(item => item[key]).join(', ');
	}
}
