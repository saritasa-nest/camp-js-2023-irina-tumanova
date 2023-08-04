import { HttpErrorItemDto } from '../dtos/http-error.dto';

/** Key for common errors. */
export const APP_COMMON_ERRORS_KEY = 'common';

/** App error dictionary. */
export class AppValidationError<TErrors extends object> extends Error {

	/** Errors. */
	public readonly errors: EntityValidationErrors<TErrors>;

	public constructor(data: InitAppValidationErrorParams<TErrors>) {
		super();
		this.errors = data.errors;
	}
}

export type EntityValidationErrors<T> = {
	[K in keyof T]?: string;
} & {common?: string;};

type InitAppValidationErrorParams<TErrors extends object> = Omit<AppValidationError<TErrors>, 'name' | 'message'>;

export type ValidationMapper<TErrors> = (errors: readonly HttpErrorItemDto[]) => TErrors;
