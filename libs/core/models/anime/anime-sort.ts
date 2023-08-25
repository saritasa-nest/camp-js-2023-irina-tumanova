import { enumToArray } from '../../utils/enum-to-array';

/** Field to sort by. */
export enum AnimeSortingField {
	TitleEnglish = 'titleEnglish',
	Status = 'status',
}

/** Anime readable sort field. */
export namespace AnimeSortingField {
	const TO_READABLE_SORT: Record<AnimeSortingField, string> = {
		[AnimeSortingField.TitleEnglish]: 'Title English',
		[AnimeSortingField.Status]: 'Status',
	};

	/** Converts enum animeSortingField type to array. */
	export function toArray(): readonly AnimeSortingField[] {
		return enumToArray(AnimeSortingField);
	}

	/**
	 * Makes sort field type readable.
	 * @param value Anime sort field type.
	 */
	export function toReadable(value: AnimeSortingField): string {
		return TO_READABLE_SORT[value];
	}
}
