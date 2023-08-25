import { ListParams } from '../list-params';
import { PaginationParams } from '../pagination-params';
import { Sorting } from '../sorting';
import { AnimeSortingField } from './anime-sort';
import { AnimeType } from './anime-type';

/** Filters parameters for getting anime. */
export class AnimeFilterParams {
	/** Anime types. */
	public readonly types: AnimeType[];

	/** Search. */
	public readonly search: string;

	public constructor({ types, search }: InitAnimeFilterParams) {
		this.types = types;
		this.search = search;
	}
}

type InitAnimeFilterParams = AnimeFilterParams;

/** Request params for getting anime. */
export type AnimeParams = ListParams<AnimeFilterParams, AnimeSortingField>;

export type QueryAnimeParams = PaginationParams & Sorting<AnimeSortingField> & {
	search: string;
	types: string;
};
