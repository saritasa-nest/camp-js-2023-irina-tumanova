import { Pipe, PipeTransform } from '@angular/core';

/** Transform object to string.*/
@Pipe({
	name: 'readableTextFromObject',
	pure: false,
})
export class ReadableTextFromObjectPipe implements PipeTransform {

	/** @inheritdoc */
	public transform<TItem>(item: TItem, nameKey: keyof TItem | null): string {
		if (item === null || item === undefined || nameKey === null || item[nameKey] === undefined) {
			return '';
		}
		return String(item[nameKey]);
	}
}
