import { EntityValidationErrors } from '../app-error';

/** Required data for registration. */
export class Registration {

	/** Email. */
	public readonly email: string;

	/** First name. */
	public readonly firstName: string;

	/** Last name. */
	public readonly lastName: string;

	/** Password. */
	public readonly password: string;

	public constructor(data: InitRegistrationParams) {
		this.email = data.email;
		this.firstName = data.firstName;
		this.lastName = data.lastName;
		this.password = data.password;
	}
}

type InitRegistrationParams = Registration;

/** Registration data inside the registration form. */
export type RegistrationForm = Registration & {
	readonly repeatedPassword: string;
};

export type RegistrationValidationErrors = EntityValidationErrors<{[K in keyof Registration]?: string}>;
