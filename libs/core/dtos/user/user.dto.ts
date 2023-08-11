/** User DTO. */
export interface UserDto {

	/** Email. */
	readonly email: string;

	/** First name. */
	readonly first_name: string;

	/** Last name. */
	readonly last_name: string;

	/** Avatar url. */
	readonly avatar: string;

	/**
	 * Creation date.
	 * @example 2023-07-18T10:32:17.881Z
	 */
	readonly created: string;

	/**
	 * Modification date.
	 * @example 2023-07-18T10:32:17.881Z
	 */
	readonly modified: string;
}
