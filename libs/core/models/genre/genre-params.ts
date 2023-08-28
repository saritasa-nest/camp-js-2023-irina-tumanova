import { ListParams } from '../list-params';
import { PaginationParams } from '../pagination-params';
import { Sorting } from '../sorting';
import { GenreSortingField } from './genre-sort';
import { GenreType } from './genre-type';

/** Filters parameters for getting anime. */
export class GenreFilterParams {
	/** Anime types. */
	public readonly types: GenreType[];

	/** Search. */
	public readonly search: string;

	public constructor({ types, search }: InitGenreFilterParams) {
		this.types = types;
		this.search = search;
	}
}

type InitGenreFilterParams = GenreFilterParams;

/** Request params for getting anime. */
export type GenreParams = ListParams<GenreFilterParams, GenreSortingField>;

/** Query genre params. */
export type QueryGenreParams = PaginationParams &
Sorting<GenreSortingField> & {
	readonly search: string;
	readonly types: string;
};
