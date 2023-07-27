import { FormControl, FormGroup } from '@angular/forms';

/** Base type for Form Group values. Control values can be anything. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FormGroupValuesBase = Record<string, any>;

/** Common type for Form Group. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FormGroupOf<T extends FormGroupValuesBase> = FormGroup<{ [key in keyof T]: FormControl<T[key]> }>;
