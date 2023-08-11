import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

/** Selects auth loading state. */
export const selectIsAuthLoading = createSelector(
	(state: RootState) => state.auth.isLoading,
	isLoading => isLoading,
);

/** Selects auth loading state. */
export const selectAuthError = createSelector(
	(state: RootState) => state.auth.error,
	error => error,
);
