import { AppValidationError } from '@js-camp/core/models/app-error';
import { LoginValidationErrors } from '@js-camp/core/models/auth/login';
import { RegistrationValidationErrors } from '@js-camp/core/models/auth/registration';

/** Auth state. */
export interface AuthState {

	/** Auth is loading. */
	readonly isLoading: boolean;

	/** Error. */
	readonly error?: AppValidationError<LoginValidationErrors | RegistrationValidationErrors>;
}

export const initialState: AuthState = {
	isLoading: false,
};
