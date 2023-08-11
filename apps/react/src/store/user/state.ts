import { User } from '@js-camp/core/models/user/user';

/** User state. */
export interface AuthState {

	/** User is loading. */
	readonly isLoading: boolean;

	/** Error. */
	readonly error?: string;

	/** User. */
	readonly user: User | null;
}

export const initialState: AuthState = {
	isLoading: false,
	user: null,
};
