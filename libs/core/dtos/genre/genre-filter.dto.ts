/** Filters params for getting genre DTO. */
export interface GenreFilterParamsDto {

	/** Genre types. */
	readonly type__in: string;

	/** Search. */
	readonly search: string;
}

/** Field to sort by. */
export enum GenreSortingFieldDto {
	Name = 'name',
	Type = 'type',
	None = '',
}
