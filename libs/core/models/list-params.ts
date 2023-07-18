import { PaginationParams } from './pagination-params';
import { Sorting } from './sorting';

/** Params for query with list. */
export type ListParams<TFilters, TSortField> = PaginationParams & {

	/** Sorting: sort field and direction. */
	readonly sorting: Sorting<TSortField>;

	/** List filters. */
	readonly filters: TFilters;
};
