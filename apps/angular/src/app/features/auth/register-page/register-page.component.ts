import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@js-camp/angular/core/services/auth.service';
import { Registration, RegistrationForm } from '@js-camp/core/models/auth/registration';
import { FormGroupOf } from '@js-camp/core/models/form-type-of';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { AppValidators } from '@js-camp/angular/core/utils/validators';

const defaultFormValues: RegistrationForm = {
	email: '',
	firstName: '',
	lastName: '',
	password: '',
	repeatedPassword: '',
};

/** Sign up page. */
@Component({
	selector: 'camp-register-page',
	templateUrl: './register-page.component.html',
	styleUrls: ['./register-page.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPageComponent {

	/** Is the password hidden. */
	protected shouldPasswordBeHidden = true;

	/** Registration form. */
	protected readonly registrationForm: FormGroupOf<RegistrationForm>;

	private readonly formBuilder = inject(NonNullableFormBuilder);

	private readonly authService = inject(AuthService);

	private readonly router = inject(Router);

	public constructor() {
		this.registrationForm = this.createRegistrationForm();
	}

	private createRegistrationForm(): FormGroupOf<RegistrationForm> {
		const registrationForm = this.formBuilder.group({
			email: [defaultFormValues.email, [Validators.required, Validators.email]],
			firstName: [defaultFormValues.firstName, [Validators.required]],
			lastName: [defaultFormValues.lastName, [Validators.required]],
			password: [defaultFormValues.password, [Validators.required, Validators.minLength(8)]],
			repeatedPassword: [defaultFormValues.repeatedPassword, [Validators.required, Validators.minLength(8)]],
		});

		registrationForm.setValidators(AppValidators.passwordRepetition());

		return registrationForm;
	}

	/** Submit login form. */
	protected handleSubmit(): void {
		if (this.registrationForm.status !== 'VALID') {
			return;
		}

		this.authService.register(this.createFormValues(this.registrationForm.value))
			.pipe(
				tap(() => this.router.navigate(['anime'])),
			)
			.subscribe();
	}

	/** Change password visibility. */
	protected changePasswordVisibilitiy(): void {
		this.shouldPasswordBeHidden = !this.shouldPasswordBeHidden;
	}

	private createFormValues(values: Partial<RegistrationForm>): Registration {
		return new Registration({
			email: values.email ?? defaultFormValues.email,
			firstName: values.firstName ?? defaultFormValues.firstName,
			lastName: values.lastName ?? defaultFormValues.lastName,
			password: values.password ?? defaultFormValues.password,
		});
	}
}
