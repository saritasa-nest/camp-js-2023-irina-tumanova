import { FormControl, FormGroup } from '@angular/forms';

/** Base type for Form Group values. Control values can be anything. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FormGroupValuesBase = Record<string, any>;

/** Common type for Form Group. */
export type FormGroupOf<T extends FormGroupValuesBase, GroupKeysT extends string = ''> = FormGroup<{
	[key in keyof T]: key extends GroupKeysT ?
		FormGroupOf<T[key]> :
		FormControl<T[key]>
}>;
