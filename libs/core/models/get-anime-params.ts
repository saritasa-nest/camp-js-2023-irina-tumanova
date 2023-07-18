import { AnimeType } from '../dtos/anime.dto';

import { ListParams } from './list-params';

/** Filters parameters for getting anime. */
export interface GetAnimeFilterParams {

	/** Selected anime types to display. */
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
export type GetAnimeParams = ListParams<GetAnimeFilterParams, AnimeSortField>;
