import { enumToArray } from '../../../core/utils/enum-to-array';

/** Field to sort by. */
export enum GenreSortingField {
	Name = 'name',
	Type = 'type',
}

/** Genre readable sort field. */
export namespace GenreSortingField {
	const TO_READABLE_SORT: Record<GenreSortingField, string> = {
		[GenreSortingField.Name]: 'Name',
		[GenreSortingField.Type]: 'Type',
	};

	/** Converts enum genreSortingField type to array. */
	export function toArray(): readonly GenreSortingField[] {
		return enumToArray(GenreSortingField);
	}

	/**
	 * Makes sort field type readable.
	 * @param value Genre sort field type.
	 */
	export function toReadable(value: GenreSortingField): string {
		return TO_READABLE_SORT[value];
	}
}
