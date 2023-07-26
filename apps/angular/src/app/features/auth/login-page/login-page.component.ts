import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@js-camp/angular/core/services/auth.service';
import { Login } from '@js-camp/core/models/auth/login';
import { FormGroupOf } from '@js-camp/core/models/form-type-of';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, finalize, of, tap } from 'rxjs';
import { untilDestroyed } from '@js-camp/angular/shared/pipes/until-destroyed';
import { ErrorService } from '@js-camp/angular/core/services/error.service';
import { HttpError } from '@js-camp/core/models/http-error';
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
	protected readonly loginErrors$ = new BehaviorSubject<HttpError[]>([]);

	private readonly formBuilder = inject(NonNullableFormBuilder);

	private readonly authService = inject(AuthService);

	private readonly errorService = inject(ErrorService);

	private readonly router = inject(Router);

	private readonly untilDestroyed = untilDestroyed();

	public constructor() {
		this.form = this.createForm();
	}

	/** @inheritdoc */
	public ngOnInit(): void {
		this.form.valueChanges
			.pipe(this.untilDestroyed())
			.subscribe(() => this.loginErrors$.next([]));
	}

	/** Submit login form. */
	protected handleSubmit(): void {
		if (this.form.status === 'VALID') {
			this.isSubmitting$.next(true);
			this.authService.login(this.mapFormValuesForSubmit(this.form.value)).pipe(
				tap(() => this.router.navigate(['anime'])),
				catchError((error: unknown) => of(this.handleError(error))),
				finalize(() => this.isSubmitting$.next(false)),
				this.untilDestroyed(),
			)
				.subscribe();
		}
	}

	/** Create login form. */
	private createForm(): FormGroupOf<Login> {
		return this.formBuilder.group({
			email: [defaultFormValues.email, [Validators.required, Validators.email]],
			password: [defaultFormValues.password, [Validators.required, Validators.minLength(AppValidators.MIN_PASSWORD_LENGTH)]],
		});
	}

	/**
	 * Handle error from server.
	 * @param error Error from server.
	 */
	private handleError(error: unknown): void {
		this.loginErrors$.next(this.errorService.getErrors(error));
	}

	/**
	 * Map form value for submit.
	 * @param values Form values.
	 */
	private mapFormValuesForSubmit(values: Partial<Login>): Login {
		return new Login({
			email: values.email ?? defaultFormValues.email,
			password: values.password ?? defaultFormValues.password,
		});
	}

	/**
	 * Track error by code.
	 * @param _index Index.
	 * @param error Http error.
	 */
	protected trackErrorByCode(_index: number, error: HttpError): HttpError['code'] {
		return error.code;
	}
}
