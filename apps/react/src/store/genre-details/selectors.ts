import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

/** Selects genre details from store. */
export const selectGenreDetails = createSelector(
	(state: RootState) => state.genreDetails.genreDetails,
	genre => genre,
);

/** Selects genre details loading state. */
export const selectAreGenresDetailsLoading = createSelector(
	(state: RootState) => state.genreDetails.isLoading,
	isLoading => isLoading,
);

/** Selects genre details errors. */
export const selectGenreDetailsErrors = createSelector(
	(state: RootState) => state.genreDetails.error,
	error => error,
);
