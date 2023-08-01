import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@js-camp/angular/core/services/auth.service';
import { Login } from '@js-camp/core/models/auth/login';
import { FormGroupOf } from '@js-camp/core/models/form-type-of';
import { Router } from '@angular/router';
import { BehaviorSubject, finalize, first, tap } from 'rxjs';
import { untilDestroyed } from '@js-camp/angular/core/rxjs/until-destroyed';
import { AppError, AppErrors } from '@js-camp/core/models/app-error';
import { AppValidators } from '@js-camp/angular/core/utils/validators';

const defaultFormValues: Login = {
	email: '',
	password: '',
};

/** Login page. */
@Component({
	selector: 'camp-login-page',
	templateUrl: './login-page.component.html',
	styleUrls: ['../auth-form.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent implements OnInit {

	/** Login form. */
	protected readonly form: FormGroupOf<Login>;

	/** Login is submitting. */
	protected readonly isSubmitting$ = new BehaviorSubject(false);

	/** Login errors. */
	protected readonly loginErrors$ = new BehaviorSubject<AppErrors | null>(null);

	private readonly formBuilder = inject(NonNullableFormBuilder);

	private readonly authService = inject(AuthService);

	private readonly router = inject(Router);

	private readonly untilDestroyed = untilDestroyed();

	public constructor() {
		this.form = this.createForm();
	}

	/** @inheritdoc */
	public ngOnInit(): void {
		this.form.valueChanges
			.pipe(this.untilDestroyed())
			.subscribe(() => this.loginErrors$.next(null));
	}

	/** Submit login form. */
	protected handleSubmit(): void {
		if (this.form.invalid) {
			return;
		}
		this.isSubmitting$.next(true);
		this.authService.login(this.form.getRawValue()).pipe(
			first(),
			tap(() => this.router.navigate(['anime'])),
			tap(errors => this.loginErrors$.next(errors ?? null)),
			finalize(() => this.isSubmitting$.next(false)),
		)
			.subscribe();
	}

	/** Create login form. */
	private createForm(): FormGroupOf<Login> {
		return this.formBuilder.group({
			email: [defaultFormValues.email, [Validators.required, Validators.email]],
			password: [defaultFormValues.password, [Validators.required, Validators.minLength(AppValidators.MIN_PASSWORD_LENGTH)]],
		});
	}

	/**
	 * Track error by code.
	 * @param _index Index.
	 * @param error Http error.
	 */
	protected trackErrorByCode(_index: number, error: AppError): AppError['code'] {
		return error.code;
	}
}
