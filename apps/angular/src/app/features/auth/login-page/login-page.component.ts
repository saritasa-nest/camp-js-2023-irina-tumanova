import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@js-camp/angular/core/services/auth.service';
import { Login } from '@js-camp/core/models/auth/login';
import { FormGroupOf } from '@js-camp/core/models/form-type-of';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

const defaultFormValues: Login = {
	email: '',
	password: '',
};

/** Sign up page. */
@Component({
	selector: 'camp-login-page',
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {

	/** Is the password hidden. */
	protected shouldPasswordBeHidden = true;

	/** Login form. */
	protected readonly loginForm: FormGroupOf<Login>;

	private readonly formBuilder = inject(NonNullableFormBuilder);

	private readonly authService = inject(AuthService);

	private readonly router = inject(Router);

	public constructor() {
		this.loginForm = this.createRegistrationForm();
	}

	private createRegistrationForm(): FormGroupOf<Login> {
		return this.formBuilder.group({
			email: [defaultFormValues.email, [Validators.required, Validators.email]],
			password: [defaultFormValues.password, [Validators.required, Validators.minLength(8)]],
		});
	}

	/** Submit login form. */
	protected handleSubmit(): void {
		if (this.loginForm.status === 'VALID') {
			this.authService.login(this.createFormValues(this.loginForm.value))
				.pipe(
					tap(() => this.router.navigate(['anime'])),
				)
				.subscribe();
		}
	}

	/** Change password visibility. */
	protected changePasswordVisibilitiy(): void {
		this.shouldPasswordBeHidden = !this.shouldPasswordBeHidden;
	}

	private createFormValues(values: Partial<Login>): Login {
		return new Login({
			email: values.email ?? defaultFormValues.email,
			password: values.password ?? defaultFormValues.password,
		});
	}
}
