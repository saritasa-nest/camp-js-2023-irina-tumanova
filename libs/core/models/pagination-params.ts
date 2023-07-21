/** Params for pagination in table. */
export class PaginationParams {

	/** Number of elements per page. */
	public readonly pageSize: number;

	/** Number of page. */
	public readonly pageNumber: number;

	public constructor({ pageNumber, pageSize }: InitPaginationParams) {
		this.pageSize = pageSize;
		this.pageNumber = pageNumber;
	}
}

type InitPaginationParams = PaginationParams;
