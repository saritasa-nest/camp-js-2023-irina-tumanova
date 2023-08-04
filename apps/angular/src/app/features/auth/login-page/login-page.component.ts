import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@js-camp/angular/core/services/auth.service';
import { Login } from '@js-camp/core/models/auth/login';
import { FormGroupOf } from '@js-camp/core/models/form-type-of';
import { BehaviorSubject, Observable, catchError, finalize, first, tap, throwError } from 'rxjs';
import { untilDestroyed } from '@js-camp/angular/core/rxjs/until-destroyed';
import { AppErrorDictionary } from '@js-camp/core/models/app-error-dictionary';
import { AppValidators } from '@js-camp/angular/core/utils/validators';
import { ActivatedRoute, Router } from '@angular/router';
import { QueryParamsOf } from '@js-camp/core/models/query-params-of';

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
	protected readonly loginErrors$ = new BehaviorSubject<AppErrorDictionary | null>(null);

	private readonly formBuilder = inject(NonNullableFormBuilder);

	private readonly authService = inject(AuthService);

	private readonly untilDestroyed = untilDestroyed();

	private readonly router = inject(Router);

	private readonly route = inject(ActivatedRoute);

	public constructor() {
		this.form = this.createForm();
	}

	/** @inheritdoc */
	public ngOnInit(): void {
		this.form.valueChanges
			.pipe(this.untilDestroyed())
			.subscribe(() => this.loginErrors$.next(null));
	}

	/** Create login form. */
	private createForm(): FormGroupOf<Login> {
		return this.formBuilder.group({
			email: [defaultFormValues.email, [Validators.required, Validators.email]],
			password: [defaultFormValues.password, [Validators.required, Validators.minLength(AppValidators.MIN_PASSWORD_LENGTH)]],
		});
	}

	/** Submit login form. */
	protected handleSubmit(): void {
		if (this.form.invalid) {
			return;
		}
		this.isSubmitting$.next(true);
		this.authService.login(this.form.getRawValue()).pipe(
			first(),
			tap(() => this.navigateToNextUrl()),
			catchError((error: unknown) => this.handleError(error)),
			finalize(() => this.isSubmitting$.next(false)),
		)
			.subscribe();
	}

	private navigateToNextUrl(): void {
		this.router.navigateByUrl(this.mapQueryParamsToNextUrl(this.route.snapshot.queryParams));
	}

	private mapQueryParamsToNextUrl(params: QueryParamsOf<{next?: string;}>): string {
		return decodeURIComponent(params.next ?? '') ;
	}

	/**
	 * Handle login error.
	 * @param error Login error.
	 */
	private handleError(error: unknown): Observable<never> {
		if (error instanceof AppErrorDictionary) {
			this.loginErrors$.next(error ?? null);
		}
		return throwError(() => error);
	}

	/**
	 * Track error by mesasge.
	 * @param index Index.
	 */
	protected trackErrorByIndex(index: number): number {
		return index;
	}
}
