import { PaginationParamsDto } from './pagination-params.dto';

/** Params for query with list DTO. */
export type ListParamsDto<TFilters> = PaginationParamsDto & {
	[key: string]: string | number | string[];

	/** Sorting: sort field and direction. */
	readonly ordering: string;
} & TFilters;
