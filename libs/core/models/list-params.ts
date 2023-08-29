import { PaginationParams } from './pagination-params';
import { Sorting } from './sorting';

/** Params for query with list. */
export class ListParams<TFilters, TSortingField> {
	/** Pagination. */
	public readonly pagination: PaginationParams;

	/** Sorting: sort field and direction. */
	public readonly sorting: readonly Sorting<TSortingField>[];

	/** List filters. */
	public readonly filters: TFilters;

	public constructor({ sorting, filters, pagination }: InitListParams<TFilters, TSortingField>) {
		this.pagination = pagination;
		this.sorting = sorting;
		this.filters = filters;
	}
}

type InitListParams<TFilters, TSortField> = ListParams<TFilters, TSortField>;

/** DefaultListParams. */
export class DefaultListParams<TSortingField> extends ListParams<{ search: string; }, TSortingField> {}
