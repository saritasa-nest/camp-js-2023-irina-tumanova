/** User. */
export class User {

	/** Email. */
	public readonly email: string;

	/** First name. */
	public readonly firstName: string;

	/** Last name. */
	public readonly lastName: string;

	/** Avatar url. */
	public readonly avatarUrl: string;

	/** Creation date.*/
	public readonly created: Date;

	/** Modification date.*/
	public readonly modified: Date;

	public constructor(data: InitUserParams) {
		this.email = data.email;
		this.firstName = data.firstName;
		this.lastName = data.lastName;
		this.avatarUrl = data.avatarUrl;
		this.created = data.created;
		this.modified = data.modified;
	}
}

type InitUserParams = User;
