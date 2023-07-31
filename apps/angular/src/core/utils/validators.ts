import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { AppErrorConfig } from '@js-camp/core/models/app-error-config';

export namespace AppValidators{

	export const MIN_PASSWORD_LENGTH = 8;

	/**
	 * Check if the entered passwords match.
	 * @param originalPasswordName Control name of original password.
	 *  @param repeatedPasswordName Control name of repeated password.
	 */
	export function passwordRepetition(originalPasswordName: string, repeatedPasswordName: string): ValidatorFn {
		return (group: AbstractControl): ValidationErrors | null => {
			if (group instanceof FormGroup) {
				const password = group.controls[originalPasswordName];
				const repeatedPassword = group.controls[repeatedPasswordName];

				if (password === undefined || repeatedPassword === undefined) {
					return null;
				}

				let repeatedPasswordErrors = repeatedPassword.errors;

				if (password.value !== repeatedPassword.value) {
					repeatedPasswordErrors = { ...repeatedPasswordErrors, [AppErrorConfig.AppErrorCode.PasswordRepetition]: true };
				} else if (repeatedPasswordErrors !== null) {
					delete repeatedPasswordErrors[AppErrorConfig.AppErrorCode.PasswordRepetition];

					if (Object.keys(repeatedPasswordErrors).length === 0) {
						repeatedPasswordErrors = null;
					}
				}

				repeatedPassword.setErrors(repeatedPasswordErrors);
			}

			return null;
		};
	}
}
