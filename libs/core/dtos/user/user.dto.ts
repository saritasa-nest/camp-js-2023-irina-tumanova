/** User DTO. */
export interface UserDto {

	/** Email. */
	readonly email: string;

	/** First name. */
	readonly first_name: string;

	/** Last name. */
	readonly last_name: string;

	/** Avatar url. */
	readonly avatar: string | null;
}
