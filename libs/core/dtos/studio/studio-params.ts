import { PaginationParamsDto } from '../pagination-params.dto';

/** Params for query with list DTO. */
export type StudioParamsDto = PaginationParamsDto & {

	/**
	 * Sorting: sort field and direction.
	 * @example direction asc, field status: 'status'.
	 * @example direction desc, field status: '-status'.
	 */
	readonly ordering: string;
};
