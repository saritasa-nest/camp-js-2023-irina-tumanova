/** Genre type. */
export enum GenreType {
	Genres = 'Genres',
	ExplicitGenres = 'ExplicitGenres',
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

	/**
	 * Makes genre type readable.
	 * @param genreType Genre type.
	 */
	export function toReadable(genreType: GenreType): string {
		return TO_READABLE_TYPE[genreType];
	}
}
