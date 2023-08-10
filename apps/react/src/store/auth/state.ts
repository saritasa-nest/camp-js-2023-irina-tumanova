/** Auth state. */
export interface AuthState {

	/** Auth is loading. */
	readonly isLoading: boolean;

	/** Error. */
	readonly error?: string;

	/** User is authorized. */
	readonly isAuth: boolean;
}

export const initialState: AuthState = {
	isLoading: false,
	isAuth: false,
};
