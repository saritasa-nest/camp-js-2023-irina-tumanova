import { Component, ChangeDetectionStrategy, inject, ChangeDetectorRef } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@js-camp/angular/core/services/auth.service';
import { Registration, RegistrationForm } from '@js-camp/core/models/auth/registration';
import { FormGroupOf } from '@js-camp/core/models/form-type-of';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { AppValidators } from '@js-camp/angular/core/utils/validators';
import { ErrorService } from '@js-camp/angular/core/services/error.service';
import { untilDestroyed } from '@js-camp/angular/shared/pipes/until-destroyed';

const defaultFormValues: RegistrationForm = {
	email: '',
	firstName: '',
	lastName: '',
	password: '',
	repeatedPassword: '',
};

/** Registration page. */
@Component({
	selector: 'camp-register-page',
	templateUrl: './registration-page.component.html',
	styleUrls: ['../auth-form.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationPageComponent {

	/** Registration form. */
	protected readonly form: FormGroupOf<RegistrationForm>;

	private readonly formBuilder = inject(NonNullableFormBuilder);

	private readonly authService = inject(AuthService);

	private readonly errorService = inject(ErrorService);

	private readonly router = inject(Router);

	private readonly changeDetectorRef = inject(ChangeDetectorRef);

	private readonly untilDestroyed = untilDestroyed();

	public constructor() {
		this.form = this.createForm();
	}

	/** Submit login form. */
	protected handleSubmit(): void {
		if (this.form.status !== 'VALID') {
			return;
		}

		this.authService.register(this.mapFormValuesForSubmit(this.form.value))
			.pipe(
				tap(() => this.router.navigate(['anime'])),
				catchError((error: unknown) => of(this.handleError(error))),
				this.untilDestroyed(),
			)
			.subscribe();
	}

	/**
	 * Handle error from server.
	 * @param error Error from server.
	 */
	private handleError(error: unknown): void {
		const errorData = this.errorService.getErrors(error);
		this.errorService.showErrorsToForm(errorData, this.form);
		this.changeDetectorRef.markForCheck();
	}

	/** Create registration form. */
	private createForm(): FormGroupOf<RegistrationForm> {
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

	/**
	 * Map form value for submit.
	 * @param values Form values.
	 */
	private mapFormValuesForSubmit(values: Partial<RegistrationForm>): Registration {
		return new Registration({
			email: values.email ?? defaultFormValues.email,
			firstName: values.firstName ?? defaultFormValues.firstName,
			lastName: values.lastName ?? defaultFormValues.lastName,
			password: values.password ?? defaultFormValues.password,
		});
	}
}
