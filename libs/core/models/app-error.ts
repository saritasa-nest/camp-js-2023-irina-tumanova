/** Key form common app errors. */
export const APP_COMMON_ERRORS_KEY = 'common';

/** App errors. */
export class AppError extends Error {

	/** Global name. */
	public override readonly name: string;

	/** App errors. */
	public readonly errors: {

		/** Common errors. */
		[APP_COMMON_ERRORS_KEY]: readonly AppErrorItem[];

		[key: string]: readonly AppErrorItem[];
	};

	public constructor({ message, name, errors }: InitAppErrorParams) {
		super(message);
		this.name = name;
		this.errors = errors;
	}
}

type InitAppErrorParams = AppError;

/** App errors item. */
export class AppErrorItem extends Error {

	/** Code. */
	public override name: string;

	public constructor({ name, message }: InitAppErrorItemParams) {
		super(message);
		this.name = name;
	}
}

type InitAppErrorItemParams = AppErrorItem;
