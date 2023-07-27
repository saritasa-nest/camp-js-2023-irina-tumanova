import { Observable, tap } from 'rxjs';
import { AppErrors } from '@js-camp/core/models/app-error';
import { FormGroupOf, FormGroupValuesBase } from '@js-camp/core/models/form-type-of';
import { ValidationErrors } from '@angular/forms';

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
						const formErrors: ValidationErrors = {};
						errors[key].forEach(error => {
							formErrors[error.code] = error.detail;
						});

						form.controls[key].setErrors(formErrors);
					}
				});
			}),
		);
	};

}
