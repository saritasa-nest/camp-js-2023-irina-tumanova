/** Key form common app errors. */
export const APP_COMMON_ERRORS_KEY = 'common';

/** App errors. */
export class AppError<T extends Error> extends Error {

	/** App errors. */
	public readonly errors: {

		/** Common errors. */
		[APP_COMMON_ERRORS_KEY]: readonly T[];

		[key: string]: readonly T[];
	};

	public constructor({ message = 'App error', name = 'app-error', errors = defaultAppErrorItems }: InitAppErrorParams<T>) {
		super(message);
		this.name = name;
		this.errors = errors;
	}
}

type InitAppErrorParams<T extends Error> = Partial<AppError<T>>;

const defaultAppErrorItems = { common: [] };
