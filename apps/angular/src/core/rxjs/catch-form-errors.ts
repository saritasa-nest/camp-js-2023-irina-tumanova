import { OperatorFunction, catchError, throwError } from 'rxjs';

import { AppValidationError } from '@js-camp/core/models/app-error';
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
				if (error instanceof AppValidationError) {
					Object.keys(form.controls).forEach(controlName => {
						if (error.errors[controlName] !== undefined) {
							form.controls[controlName].setErrors({ [AppErrorConfig.AppErrorCode.ServerError]: error.errors[controlName] });
						}
					});
				}
				return throwError(() => error);
			}),
		);
	};

}
