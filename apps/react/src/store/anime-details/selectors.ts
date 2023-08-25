import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

/** Selects all anime from the store. */
export const selectAnimeDetails = createSelector(
	(state: RootState) => state.animeDetails.animeDetails,
	animeDetails => animeDetails,
);

/** Selects anime loading state. */
export const selectIsAnimeDetailsLoading = createSelector(
	(state: RootState) => state.animeDetails.isLoading,
	isLoading => isLoading,
);

/** Select errors. */
export const selectAnimeDetailsError = createSelector(
	(state: RootState) => state.animeDetails.error,
	error => error,
);
