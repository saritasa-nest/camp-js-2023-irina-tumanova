/** Required data for registration dto. */
export interface RegistrationDto {

	/** Email. */
	readonly email: string;

	/** First name. */
	readonly first_name: string;

	/** Last name. */
	readonly last_name: string;

	/** Password. */
	readonly password: string;
}
