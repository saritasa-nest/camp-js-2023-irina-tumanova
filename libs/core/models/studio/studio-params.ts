import { ListParams } from '../list-params';
import { PaginationParams } from '../pagination-params';
import { Sorting } from '../sorting';
import { StudioSortingField } from './studio-sort';

/** Filters parameters for getting anime. */
export class StudioFilterParams {

	/** Search. */
	public readonly search: string;

	public constructor({ search }: InitGenreFilterParams) {
		this.search = search;
	}
}

type InitGenreFilterParams = StudioFilterParams;

export type StudioParams = ListParams<StudioFilterParams, StudioSortingField>;

export type QueryStudioParams = PaginationParams &
Sorting<StudioSortingField> & {
	search: string;
};
