/** Pagination meta info. */
export class Pagination<T> {

	/** Total count of items. */
	public readonly count: number;

	/** Next page of items. */
	public readonly next: string;

	/** Previous page of items. */
	public readonly previous: string;

	/** Array of items requested. */
	public readonly items: readonly T[];

	public constructor({ count, next, previous, items }: InitPaginationParams<T>) {
		this.count = count;
		this.next = next;
		this.previous = previous;
		this.items = items;
	}
}

type InitPaginationParams<T> = Pagination<T>;
