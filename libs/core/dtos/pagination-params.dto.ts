/** Params for pagination in table. */
export interface PaginationParamsDto {

	/** Number of elements per page. */
	readonly limit: number;

	/** Number of page. */
	readonly offset: number;
}
