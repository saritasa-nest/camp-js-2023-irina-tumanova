/** Http error. */
export class HttpError {

	/** Field attr. */
	public readonly attr: string | null;

	/** Code. */
	public readonly code: string;

	/** Detail. */
	public readonly detail: string;

	public constructor({ attr, code, detail }: InitHttpErrorParams) {
		this.attr = attr;
		this.code = code;
		this.detail = detail;
	}
}

type InitHttpErrorParams = HttpError;
