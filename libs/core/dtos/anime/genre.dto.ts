/** Genre DTO. */
export interface GenreDto {

	/** Id. */
	readonly id: number;

	/** Name. */
	readonly name: string;

	/** Creation time, for example, "2014-12-20T17:30:50.416Z". */
	readonly created: string;

	/** Time of the last modification, for example, "2014-12-20T17:30:50.416Z". */
	readonly modified: string;

	/** DTO type. */
	readonly type: GenreTypeDto;
}

/** Genre type DTO. */
export enum GenreTypeDto {
	Genres = 'GENRES',
	ExplicitGenres = 'EXPLICIT_GENRES',
	Themes = 'THEMES',
	Demographics = 'DEMOGRAPHICS',
}
