import { AnimeTypeDto } from './anime.dto';

/** Request parameters for getting anime dto. */
export interface AnimeQueryParamsDto {

	/** Number of elements per page. */
	readonly limit: number;

	/** Number of page. */
	readonly offset: number;

	/** Sorting: sort field and direction. */
	readonly ordering: string;

	/** Selected anime types to display. */
	readonly type: readonly AnimeTypeDto[];

	/** Search. */
	readonly search: string;
}

/** Field to sort by dto. */
export enum AnimeSortFieldDto {
	TitleEng = 'title_eng',
	TitleJpn = 'title_jpn',
	AiredStart = 'aired__startswith',
	Status = 'status',
	None = '',
}
