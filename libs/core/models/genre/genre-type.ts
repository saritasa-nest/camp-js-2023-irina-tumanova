import { enumToArray } from '../../../core/utils/enum-to-array';

/** Genre type. */
export enum GenreType {
	Genres = 'Genres',
	ExplicitGenres = 'Explicit genres',
	Themes = 'Themes',
	Demographics = 'Demographics',
}

/** Genre Type. */
export namespace GenreType {
	const TO_READABLE_TYPE: Record<GenreType, string> = {
		[GenreType.Demographics]: 'Demographics',
		[GenreType.Themes]: 'Themes',
		[GenreType.ExplicitGenres]: 'Explicit genres',
		[GenreType.Genres]: 'Genres',
	};

	/** Converts enum genre type to array. */
	export function toArray(): readonly GenreType[] {
		return enumToArray(GenreType);
	}

	/**
	 * Makes genre type readable.
	 * @param value Genre type.
	 */
	export function toReadable(value: GenreType): string {
		return TO_READABLE_TYPE[value];
	}
}
