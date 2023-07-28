import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { AppErrorConfig } from '@js-camp/core/models/app-error-config';

export namespace AppValidators{

	export const MIN_PASSWORD_LENGTH = 8;

	/** Check if the entered passwords match. */
	export function passwordRepetition(): ValidatorFn {
		return (group: AbstractControl): ValidationErrors | null => {
			if (group instanceof FormGroup) {
				const { password, repeatedPassword } = group.controls;
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
