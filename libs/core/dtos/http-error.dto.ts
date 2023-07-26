/** Http error item DTO. */
export interface HttpErrorDto {

	/** Field attr. */
	readonly attr: string | null;

	/** Code. */
	readonly code: string;

	/** Detail. */
	readonly detail: string;
}
