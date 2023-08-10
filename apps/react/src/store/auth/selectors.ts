import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

/** Selects auth state from store. */
export const selectIsAuth = createSelector(
	(state: RootState) => state.auth.isAuth,
	isAuth => isAuth,
);

/** Selects auth loading state. */
export const selectIsAuthLoading = createSelector(
	(state: RootState) => state.auth.isLoading,
	isLoading => isLoading,
);
