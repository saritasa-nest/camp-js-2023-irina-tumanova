import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@js-camp/angular/core/services/auth.service';
import { RegistrationForm } from '@js-camp/core/models/auth/registration';
import { FormGroupOf } from '@js-camp/core/models/form-type-of';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, finalize, tap } from 'rxjs';
import { AppValidators } from '@js-camp/angular/core/utils/validators';
import { catchFormErrors } from '@js-camp/angular/core/rxjs/catch-form-errors';
import { QueryParamsService } from '@js-camp/angular/core/services/query-params.service';
import { untilDestroyed } from '@js-camp/angular/core/rxjs/until-destroyed';

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

	private readonly route = inject(ActivatedRoute);

	private readonly queryParamsService = inject(QueryParamsService);

	private readonly untilDestroyed = untilDestroyed();

	public constructor() {
		this.form = this.createForm();
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
		}, { validators: [AppValidators.passwordRepetition('password', 'repeatedPassword')] });

		return registrationForm;
	}

	/** Submit login form. */
	protected handleSubmit(): void {
		if (this.form.invalid) {
			return;
		}

		this.isSubmitting$.next(true);
		this.authService.register(this.form.getRawValue())
			.pipe(
				tap(() => this.navigateToNextUrl()),
				catchFormErrors(this.form),
				finalize(() => this.isSubmitting$.next(false)),
				this.untilDestroyed(),
			)
			.subscribe();
	}

	private navigateToNextUrl(): void {
		this.router.navigateByUrl(this.queryParamsService.mapQueryParamsToUrl(this.route.snapshot.queryParams, 'next'));
	}
}
