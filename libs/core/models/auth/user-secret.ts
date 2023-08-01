/** User secret. */
export class UserSecret {

	/** Refresh token. */
	public readonly refresh: string;

	/** Access token. */
	public readonly access: string;

	public constructor({ refresh, access }: InitUserSecretParams) {
		this.refresh = refresh;
		this.access = access;
	}
}

type InitUserSecretParams = UserSecret;
