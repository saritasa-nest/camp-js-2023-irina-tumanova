/** Register. */
export class Register {

	/** Email. */
	public readonly email: string;

	/** First name. */
	public readonly firstName: string;

	/** Last name. */
	public readonly lastName: string;

	/** Avatar image url. */
	public readonly avatarUrl: string;

	/** Password. */
	public readonly password: string;

	public constructor(data: InitRegisterParams) {
		this.email = data.email;
		this.firstName = data.firstName;
		this.lastName = data.lastName;
		this.avatarUrl = data.avatarUrl;
		this.password = data.password;
	}
}

type InitRegisterParams = Register;
