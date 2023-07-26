import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export namespace AppValidators{

	export const MIN_PASSWORD_LENGTH = 8;

	/** Check if the entered passwords match. */
	export function passwordRepetition(): ValidatorFn {
		return (group: AbstractControl): ValidationErrors | null => {
			if (group instanceof FormGroup) {
				const { password, repeatedPassword } = group.controls;

				if (repeatedPassword.value.length < MIN_PASSWORD_LENGTH) {
					return null;
				}

				if (password.value !== repeatedPassword.value) {
					repeatedPassword.setErrors({ passwordDoesNotMatch: true });
				} else {
					repeatedPassword.setErrors(null);
				}
			}

			return null;
		};
	}
}
