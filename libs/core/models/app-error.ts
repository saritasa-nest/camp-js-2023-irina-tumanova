/** Key form common app errors. */
export const APP_COMMON_ERRORS_KEY = 'common';

export const APP_ERRORS_DEFAULT = { [APP_COMMON_ERRORS_KEY]: [] };

/** App errors. */
export interface AppErrors {

	/** Common errors. */
	[APP_COMMON_ERRORS_KEY]: readonly AppError[];

	[key: string]: readonly AppError[];
}

/** App errors item. */
export class AppError {

	/** Code. */
	public readonly code: string;

	/** Detail. */
	public readonly detail: string;

	public constructor({ code, detail }: InitAppErrorParams) {
		this.code = code;
		this.detail = detail;
	}
}

type InitAppErrorParams = AppError;
