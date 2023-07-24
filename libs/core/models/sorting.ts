import { SortDirection } from '@angular/material/sort';

/** Sorting: sort field and direction. */
export class Sorting<TField> {

	/** Field to sort by. */
	public readonly field: TField;

	/**  Sorting direction. */
	public readonly direction: SortDirection;

	public constructor({ field, direction }: InitSortingParams<TField>) {
		this.field = field;
		this.direction = direction;
	}
}

type InitSortingParams<TField> = Sorting<TField>;
