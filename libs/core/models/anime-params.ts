import { SortDirection } from '@angular/material/sort';

import { AnimeType } from './anime';
import { ListParams } from './list-params';
import { PaginationParams } from './pagination-params';

/** Filters parameters for getting anime. */
export interface AnimeFilterParams {

	/** Anime types. */
	readonly type: AnimeType[];

	/** Search. */
	readonly search: string;
}

/** Field to sort by. */
export enum AnimeSortingField {
	TitleEnglish = 'titleEnglish',
	TitleJapanese = 'titleJapanese',
	AiredStart = 'aired.start',
	Status = 'status',
	None = '',
}

/** Request params for getting anime. */
export type AnimeParams = ListParams<AnimeFilterParams, AnimeSortingField>;

/** Request params from getting anime (flat). */
export type FlatAnimeParams = PaginationParams & {
	field: AnimeSortingField;
	direction: SortDirection;
} & AnimeFilterParams;
