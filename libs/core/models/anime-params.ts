import { AnimeType } from './anime';
import { ListParams } from './list-params';

/** Filters parameters for getting anime. */
export interface AnimeFilterParams {

	/** Anime types. */
	readonly type: AnimeType[];

	/** Search. */
	readonly search: string;
}

/** Field to sort by. */
export enum AnimeSortField {
	TitleEng = 'title_eng',
	TitleJpn = 'title_jpn',
	AiredStart = 'aired__startswith',
	Status = 'status',
	None = '',
}

/** Request parameters for getting anime. */
export type AnimeParams = ListParams<AnimeFilterParams, AnimeSortField>;
