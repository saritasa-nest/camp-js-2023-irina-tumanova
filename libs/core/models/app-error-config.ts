export namespace AppErrorConfig {

	/** App error code. */
	export enum AppErrorCode {
		Required = 'required',
		RequiredImage = 'requiredImage',
		MinLength = 'minlength',
		Email = 'email',
		PasswordRepetition = 'passwordRepetition',
		ServerError = 'serverError',
	}

	const TO_READABLE_APP_ERROR_MAP: Readonly<Record<AppErrorCode, (field: string) => string>> = {
		[AppErrorCode.Required]: field => `Please enter ${field}`,
		[AppErrorCode.RequiredImage]: _field => `Please select image: click or drag`,
		[AppErrorCode.MinLength]: _field => 'Min characters: ',
		[AppErrorCode.Email]: _field => 'Invalid email',
		[AppErrorCode.PasswordRepetition]: _field => `Repeated password doesn't match`,
		[AppErrorCode.ServerError]: _field => 'Server error',
	};

	/**
	 * Converts a error code into readable equivalent.
	 * @param code App error code.
	 * @param field Form field name.
	 */
	export function toReadableAppError(code: AppErrorCode, field: string): string {
		return TO_READABLE_APP_ERROR_MAP[code](field);
	}
}
