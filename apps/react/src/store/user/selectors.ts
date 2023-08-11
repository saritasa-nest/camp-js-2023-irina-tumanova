import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

/** Selects user state from store. */
export const selectIsUserLoading = createSelector(
	(state: RootState) => state.user.isLoading,
	isLoading => isLoading,
);

/** Selects user. */
export const selectUser = createSelector(
	(state: RootState) => state.user.user,
	user => user,
);

/** Selects user loading state. */
export const selectUserError = createSelector(
	(state: RootState) => state.auth.error,
	error => error,
);
