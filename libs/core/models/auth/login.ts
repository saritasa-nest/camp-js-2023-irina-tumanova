/** Required data for login. */
export class Login {

	/** Email. */
	public readonly email: string | null;

	/** Password. */
	public readonly password: string | null;

	public constructor({ email, password }: InitLoginParams) {
		this.email = email;
		this.password = password;
	}
}

type InitLoginParams = Login;
