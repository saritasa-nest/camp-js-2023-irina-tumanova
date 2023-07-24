/** Token. */
export class Token {

	/** Refresh token. */
	public readonly refresh: string;

	/** Access token. */
	public readonly access: string;

	public constructor({ refresh, access }: InitTokenParams) {
		this.refresh = refresh;
		this.access = access;
	}
}

type InitTokenParams = Token;
