/** Http error item DTO. */
export interface HttpErrorItemDto {

	/** Field attr. */
	readonly attr: string | null;

	/** Code. */
	readonly code: string;

	/** Detail. */
	readonly detail: string;
}

export interface HttpErrorDto extends Error {
	readonly error?: {
		readonly errors?: readonly HttpErrorItemDto[];
	};
}
