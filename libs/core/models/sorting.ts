
import { SortDirection } from '@angular/material/sort';

/** Sorting: sort field and direction. */
export interface Sorting<TField>{

	/** Field to sort by. */
	field: TField;

	/** Sorting direction. */
	direction: SortDirection;
}
