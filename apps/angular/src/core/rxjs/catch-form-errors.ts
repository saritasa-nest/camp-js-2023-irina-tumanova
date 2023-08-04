import { OperatorFunction, catchError, throwError } from 'rxjs';
import { AppErrorDictionary } from '@js-camp/core/models/app-error-dictionary';
import { FormGroupOf, FormGroupValuesBase } from '@js-camp/core/models/form-type-of';
import { AppErrorConfig } from '@js-camp/core/models/app-error-config';

/**
 * Catch form error.
 * @description Inserts form errors in form.
 * @param form Form group.
 */
export function catchFormErrors<TForm extends FormGroupValuesBase>(form: FormGroupOf<TForm>): OperatorFunction<unknown, unknown> {
	return function(source$) {
		return source$.pipe(
			catchError((error: unknown) => {
				if (error instanceof AppErrorDictionary) {
					Object.keys(error.errors).forEach(key => {
						if (form.controls[key] !== undefined) {
							form.controls[key].setErrors({ [AppErrorConfig.AppErrorCode.ServerError]: error.errors[key].join(', ') });
						}
					});
				}
				return throwError(() => error);
			}),
		);
	};

}
