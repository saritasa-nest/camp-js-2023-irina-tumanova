import { Observable, tap } from 'rxjs';
import { AppErrors } from '@js-camp/core/models/app-error';
import { FormGroupOf, FormGroupValuesBase } from '@js-camp/core/models/form-type-of';
import { AppErrorConfig } from '@js-camp/core/models/app-error-config';

/**
 * Catch form error.
 * @description Inserts form errors in form.
 * @param form Form group.
 */
export function catchFormError<TForm extends FormGroupValuesBase>(form: FormGroupOf<TForm>):
(source$: Observable<AppErrors>) => Observable<AppErrors> {
	return function(source$) {
		return source$.pipe(
			tap(errors => {
				Object.keys(errors).map(key => {
					if (form.controls[key] !== undefined) {
						const serverErrors = errors[key].map(error => error.detail);
						form.controls[key].setErrors({ [AppErrorConfig.AppErrorCode.ServerError]: serverErrors.join(', ') });
					}
				});
			}),
		);
	};

}
