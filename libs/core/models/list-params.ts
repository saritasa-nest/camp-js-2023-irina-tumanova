import { PaginationParams } from './pagination-params';
import { Sorting } from './sorting';

/** Params for query with list. */
export type ListParams<TFilters, TSortingField> = PaginationParams & {

	/** Sorting: sort field and direction. */
	readonly sorting: Sorting<TSortingField>;

	/** List filters. */
	readonly filters: TFilters;
};
