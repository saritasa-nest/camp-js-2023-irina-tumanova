import { enumToArray } from '../../../core/utils/enum-to-array';

/** Field to sort by. */
export enum StudioSortingField {
	Name = 'name',
	Modified = 'modified',
}

/** Studio readable sort field. */
export namespace StudioSortingField {
	const TO_READABLE_SORT: Record<StudioSortingField, string> = {
		[StudioSortingField.Name]: 'Name',
		[StudioSortingField.Modified]: 'Modified',

	};

	/** Converts enum studioSortingField type to array. */
	export function toArray(): readonly StudioSortingField[] {
		return enumToArray(StudioSortingField);
	}

	/**
	 * Makes sort field type readable.
	 * @param value Studio sort field type.
	 */
	export function toReadable(value: StudioSortingField): string {
		return TO_READABLE_SORT[value];
	}
}
