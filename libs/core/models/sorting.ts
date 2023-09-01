/** Sort direction. */
export enum SortDirection {
	Asc = 'asc',
	Desc = 'desc',
	None = '',
}

/** Sorting: sort field and direction. */
export interface Sorting<TField> {

	/** Field to sort by. */
	readonly field: TField;

	/**  Sorting direction. */
	readonly direction: SortDirection;
}
