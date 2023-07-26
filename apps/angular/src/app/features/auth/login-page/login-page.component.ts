import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@js-camp/angular/core/services/auth.service';
import { Login } from '@js-camp/core/models/auth/login';
import { FormGroupOf } from '@js-camp/core/models/form-type-of';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { untilDestroyed } from '@js-camp/angular/shared/pipes/until-destroyed';

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
export class LoginPageComponent {

	/** Login form. */
	protected readonly form: FormGroupOf<Login>;

	private readonly formBuilder = inject(NonNullableFormBuilder);

	private readonly authService = inject(AuthService);

	private readonly router = inject(Router);

	private readonly untilDestroyed = untilDestroyed();

	public constructor() {
		this.form = this.createForm();
	}

	/** Submit login form. */
	protected handleSubmit(): void {
		if (this.form.status === 'VALID') {
			this.authService.login(this.mapFormValuesForSubmit(this.form.value))
				.pipe(
					tap(() => this.router.navigate(['anime'])),
					this.untilDestroyed(),
				)
				.subscribe();
		}
	}

	/** Create login form. */
	private createForm(): FormGroupOf<Login> {
		return this.formBuilder.group({
			email: [defaultFormValues.email, [Validators.required, Validators.email]],
			password: [defaultFormValues.password, [Validators.required, Validators.minLength(8)]],
		});
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
}
