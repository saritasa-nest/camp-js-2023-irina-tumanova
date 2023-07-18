import { PaginationParamsDto } from './pagination-params.dto';

/** Params for query with list. */
export type ListParamsDto<TFilters> = PaginationParamsDto & {

	/** Sorting: sort field and direction. */
	readonly ordering: string;
} & TFilters;
