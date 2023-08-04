/** Key for common errors. */
export const APP_COMMON_ERRORS_KEY = 'common';

/** App error dictionary. */
export class AppErrorDictionary extends Error {

	/** Errors. */
	public readonly errors: {

		/** Common errors. */
		[APP_COMMON_ERRORS_KEY]: readonly string[];

		[key: string]: readonly string[];
	};

	public constructor(data?: InitAppErrorDictionaryParams) {
		super();
		this.errors = data?.errors ?? { ...defaultAppErrorItems };
	}
}

type InitAppErrorDictionaryParams = Partial<AppErrorDictionary>;

const defaultAppErrorItems = { common: [] };
