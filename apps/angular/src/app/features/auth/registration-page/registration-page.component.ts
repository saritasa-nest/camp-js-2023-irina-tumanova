import { Component, ChangeDetectionStrategy, inject, ChangeDetectorRef } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@js-camp/angular/core/services/auth.service';
import { RegistrationForm } from '@js-camp/core/models/auth/registration';
import { FormGroupOf } from '@js-camp/core/models/form-type-of';
import { Router } from '@angular/router';
import { BehaviorSubject, finalize, first, map, tap } from 'rxjs';
import { AppValidators } from '@js-camp/angular/core/utils/validators';
import { catchHttpErrorResponse } from '@js-camp/angular/core/rxjs/catchHttpErrorResponse';
import { catchFormError } from '@js-camp/angular/core/rxjs/catchFormError';
import { APP_ERRORS_DEFAULT } from '@js-camp/core/models/app-error';

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

	/** Registration is submitting. */
	protected readonly isSubmitting$ = new BehaviorSubject(false);

	private readonly formBuilder = inject(NonNullableFormBuilder);

	private readonly authService = inject(AuthService);

	private readonly router = inject(Router);

	private readonly changeDetectorRef = inject(ChangeDetectorRef);

	public constructor() {
		this.form = this.createForm();
	}

	/** Submit login form. */
	protected handleSubmit(): void {
		if (this.form.status !== 'VALID') {
			return;
		}

		this.isSubmitting$.next(true);
		this.authService.register(this.form.getRawValue())
			.pipe(
				first(),
				tap(() => this.router.navigate(['anime'])),
				catchHttpErrorResponse(),
				map(errors => errors ?? APP_ERRORS_DEFAULT),
				catchFormError(this.form),

				tap(() => this.changeDetectorRef.markForCheck()),
				finalize(() => this.isSubmitting$.next(false)),
			)
			.subscribe();
	}

	/** Create registration form. */
	private createForm(): FormGroupOf<RegistrationForm> {
		const registrationForm = this.formBuilder.group({
			email: [defaultFormValues.email, [Validators.required, Validators.email]],
			firstName: [defaultFormValues.firstName, [Validators.required]],
			lastName: [defaultFormValues.lastName, [Validators.required]],
			password: [defaultFormValues.password, [Validators.required, Validators.minLength(AppValidators.MIN_PASSWORD_LENGTH)]],
			repeatedPassword: [
				defaultFormValues.repeatedPassword,
				[Validators.required, Validators.minLength(AppValidators.MIN_PASSWORD_LENGTH)],
			],
		}, { validators: [AppValidators.passwordRepetition()] });

		return registrationForm;
	}
}
