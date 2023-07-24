/** Register dto. */
export interface RegisterDto {

	/** Email. */
	readonly email: string;

	/** First name. */
	readonly first_name: string;

	/** Last name. */
	readonly last_name: string;

	/** Avatar image url. */
	readonly avatar: string;

	/** Password. */
	readonly password: string;
}
