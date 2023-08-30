import { ListParams } from '../list-params';
import { PaginationParams } from '../pagination-params';
import { Sorting } from '../sorting';
import { StudioSortingField } from './studio-sort';

/** Filters parameters for getting studios. */
export class StudioFilterParams {

	/** Search. */
	public readonly search: string;

	public constructor({ search }: InitGenreFilterParams) {
		this.search = search;
	}
}

type InitGenreFilterParams = StudioFilterParams;

/** Request params for getting studios. */
export type StudioParams = ListParams<StudioFilterParams, StudioSortingField>;

/** Query studio params. */
export type QueryStudioParams = PaginationParams &
Sorting<StudioSortingField> & {
	readonly search: string;
};
