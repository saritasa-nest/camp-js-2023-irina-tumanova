/** User. */
export class User {
	/** Email. */
	public readonly email: string;

	/** First name. */
	public readonly firstName: string;

	/** Last name. */
	public readonly lastName: string;

	/** Avatar url. */
	public readonly avatarUrl: string | null;

	public constructor(data: InitUserParams) {
		this.email = data.email;
		this.firstName = data.firstName;
		this.lastName = data.lastName;
		this.avatarUrl = data.avatarUrl;
	}
}

type InitUserParams = User;
