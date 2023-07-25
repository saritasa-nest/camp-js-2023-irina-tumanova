/** Required data for registration. */
export class Registration {

	/** Email. */
	public readonly email: string | null;

	/** First name. */
	public readonly firstName: string | null;

	/** Last name. */
	public readonly lastName: string | null;

	/** Password. */
	public readonly password: string | null;

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
	repeatedPassword: string | null;
};
