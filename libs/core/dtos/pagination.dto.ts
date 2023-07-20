/** Pagination meta info DTO. */
export interface PaginationDto<T> {

	/** Total count of items. */
	readonly count: number;

	/** Next page of items. */
	readonly next: string;

	/** Previous page of items. */
	readonly previous: string;

	/** Array of items requested. */
	readonly results: readonly T[];
}
