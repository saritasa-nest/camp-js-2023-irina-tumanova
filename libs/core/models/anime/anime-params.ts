import { ListParams } from '../list-params';
import { PaginationParams } from '../pagination-params';
import { Sorting } from '../sorting';

import { AnimeType } from './anime';

/** Filters parameters for getting anime. */
export class AnimeFilterParams {

	/** Anime types. */
	public readonly type: AnimeType[];

	/** Search. */
	public readonly search: string;

	public constructor({ type, search }: InitAnimeFilterParams) {
		this.type = type;
		this.search = search;
	}
}

type InitAnimeFilterParams = AnimeFilterParams;

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

export type QueryAnimeParams = PaginationParams & Sorting<AnimeSortingField> & {
	search: string;
	type: string;
};
