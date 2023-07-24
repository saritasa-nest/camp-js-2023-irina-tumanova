import { PaginationParams } from './pagination-params';
import { Sorting } from './sorting';

/** Params for query with list. */
export class ListParams<TFilters, TSortField> {

	/** Pagination. */
	public readonly pagination: PaginationParams;

	/** Sorting: sort field and direction. */
	public readonly sorting: Sorting<TSortField>;

	/** List filters. */
	public readonly filters: TFilters;

	public constructor({ sorting, filters, pagination }: InitListParams<TFilters, TSortField>) {
		this.pagination = pagination;
		this.sorting = sorting;
		this.filters = filters;
	}
}

type InitListParams<TFilters, TSortField> = ListParams<TFilters, TSortField>;
