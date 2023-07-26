import { FormControl, FormGroup } from '@angular/forms';

/** This is a common type for Form Group. Control values can be anything. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FormGroupOf<T extends Record<string, any>> = FormGroup<{ [key in keyof T]: FormControl<T[key]> }>;
