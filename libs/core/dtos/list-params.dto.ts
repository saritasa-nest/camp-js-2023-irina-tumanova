import { PaginationParamsDto } from './pagination-params.dto';

/** Params for query with list DTO. */
export type ListParamsDto<TFilters> = PaginationParamsDto & {
	[key: string]: string | number | string[];

	/**
	 * Sorting: sort field and direction.
	 * @example direction asc, field status: 'status'.
	 * @example direction desc, field status: '-status'.
	 */
	readonly ordering: string;
} & TFilters;
