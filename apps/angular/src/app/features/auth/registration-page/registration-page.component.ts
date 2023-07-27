import { Component, ChangeDetectionStrategy, inject, ChangeDetectorRef } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@js-camp/angular/core/services/auth.service';
import { RegistrationForm } from '@js-camp/core/models/auth/registration';
import { FormGroupOf } from '@js-camp/core/models/form-type-of';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, finalize, of, tap } from 'rxjs';
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

	/** Registration is submitting. */
	protected readonly isSubmitting$ = new BehaviorSubject(false);

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

		this.isSubmitting$.next(true);
		this.authService.register(this.form.getRawValue())
			.pipe(
				tap(() => this.router.navigate(['anime'])),
				catchError((error: unknown) => of(this.handleError(error))),
				finalize(() => this.isSubmitting$.next(false)),
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
			password: [defaultFormValues.password, [Validators.required, Validators.minLength(AppValidators.MIN_PASSWORD_LENGTH)]],
			repeatedPassword: [
				defaultFormValues.repeatedPassword,
				[Validators.required, Validators.minLength(AppValidators.MIN_PASSWORD_LENGTH)],
			],
		}, { validators: [AppValidators.passwordRepetition()] });

		return registrationForm;
	}
}
