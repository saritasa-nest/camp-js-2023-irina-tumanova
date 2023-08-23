/** Field to sort by. */
export enum AnimeSortingField {
	TitleEnglish = 'titleEnglish',
	Status = 'status',
}

type NonFunctional<T> = T extends Function ? never : T;

/**
 * Helper to produce an array of enum values.
 * @param enumeration Enumeration object.
 */
export function enumToArray<T extends Record<string, unknown>>(enumeration: T): readonly NonFunctional<T[keyof T]>[] {
	return Object.keys(enumeration)
		.filter(key => isNaN(Number(key)))
		.map(key => enumeration[key])
		.filter((val): val is NonFunctional<T[keyof T]> => typeof val === 'number' || typeof val === 'string');
}

/** Anime readable sort field. */
export namespace ReadableAnimeSortField {
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
