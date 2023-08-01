import { Pipe, PipeTransform } from '@angular/core';

/**
 * Transform array of objects to string.
 * @example [{a:1, b:2}] | readableTextFromArray:a -> '1'.
 */
@Pipe({
	name: 'readableTextFromArray',
	pure: false,
})
export class ReadableTextFromArrayPipe implements PipeTransform {

	/** @inheritdoc */
	public transform<T>(array: readonly T[] | null, key: keyof T): string {
		if (array === null || array.length === 0) {
			return '';
		}
		return array.filter(item => item[key] !== undefined)
			.map(item => item[key])
			.join(', ');
	}
}
