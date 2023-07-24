/** Login. */
export class Login {

	/** Email. */
	public readonly email: string;

	/** Password. */
	public readonly password: string;

	public constructor({ email, password }: InitLoginParams) {
		this.email = email;
		this.password = password;
	}
}

type InitLoginParams = Login;
