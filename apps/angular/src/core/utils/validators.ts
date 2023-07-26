import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export namespace AppValidators{

	/** Check if the entered passwords match. */
	export function passwordRepetition(): ValidatorFn {
		return (group: AbstractControl): ValidationErrors | null => {
			if (group instanceof FormGroup) {
				const { password, repeatedPassword } = group.controls;
				if (password.value !== repeatedPassword.value && repeatedPassword.value.length > 0) {
					repeatedPassword.setErrors({ ...repeatedPassword.errors, passwordDoesNotMatch: true });
				} else if (repeatedPassword.errors !== null) {
					repeatedPassword.setErrors({ ...repeatedPassword.errors, passwordDoesNotMatch: false });
				}
			}

			return null;
		};
	}
}
