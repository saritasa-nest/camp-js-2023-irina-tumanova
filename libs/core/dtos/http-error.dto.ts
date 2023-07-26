/** Http error DTO. */
export class HttpErrorDto {

	/** Type. */
	public readonly type: string;

	/** Errors list. */
	public readonly errors: readonly HttpErrorItemDto[];

	public constructor({ type, errors }: InitHttpErrorDtoType) {
		this.type = type;
		this.errors = errors;
	}
}

type InitHttpErrorDtoType = HttpErrorDto;

/** Http error item DTO. */
interface HttpErrorItemDto {

	/** Field attr. */
	readonly attr: string | null;

	/** Code. */
	readonly code: string;

	/** Detail. */
	readonly detail: string;
}
