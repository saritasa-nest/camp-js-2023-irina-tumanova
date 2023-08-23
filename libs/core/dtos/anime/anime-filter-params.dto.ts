/** Filters params for getting anime DTO. */
export interface AnimeFilterParamsDto {

	/** Anime types. */
	readonly type__in: string;

	/** Search. */
	readonly search: string;
}

/** Field to sort by. */
export enum AnimeSortingFieldDto {
	TitleEnglish = 'title_eng',
	Status = 'status',
}
