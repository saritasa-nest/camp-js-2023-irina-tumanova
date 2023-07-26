import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export namespace AppValidators{

	/** Check if the entered passwords match. */
	export function passwordRepetition(): ValidatorFn {
		return (group: AbstractControl): ValidationErrors | null => {
			if (group instanceof FormGroup) {
				const { password, repeatedPassword } = group.controls;

				if (repeatedPassword.value.length < 8) {
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
