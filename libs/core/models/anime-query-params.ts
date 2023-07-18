import { AnimeType } from './anime';

/** Request parameters for getting anime. */
export interface AnimeQueryParams {

	/** Number of elements per page. */
	limit: number;

	/** Number of page. */
	page: number;

	/** Sorting: sort field and direction. */
	sorting: AnimeSorting;

	/** Selected anime types to display. */
	type: AnimeType[];

	/** Search. */
	search: string;
}

/** Sorting: sort field and direction. */
export interface AnimeSorting{

	/** Field to sort by. */
	field: AnimeSortField;

	/** Sorting direction. */
	direction: AnimeSortDirection;
}

/** Sorting direction. */
export enum AnimeSortDirection {
	Asc = '',
	Desc = '-',
}

/** Field to sort by. */
export enum AnimeSortField {
	TitleEng = 'titleEng',
	TitleJpn = 'titleJpn',
	AiredStart = 'airedStart',
	Status = 'status',
	None = '',
}
