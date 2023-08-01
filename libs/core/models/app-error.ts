/** Key form common app errors. */
export const APP_COMMON_ERRORS_KEY = 'common';

/** App errors. */
export class AppError<T extends Error> extends Error {

	/** Global name. */
	public override readonly name: string;

	/** App errors. */
	public readonly errors: {

		/** Common errors. */
		[APP_COMMON_ERRORS_KEY]: readonly T[];

		[key: string]: readonly T[];
	};

	public constructor({ message, name, errors }: InitAppErrorParams<T>) {
		super(message);
		this.name = name;
		this.errors = errors;
	}
}

type InitAppErrorParams<T extends Error> = AppError<T>;
