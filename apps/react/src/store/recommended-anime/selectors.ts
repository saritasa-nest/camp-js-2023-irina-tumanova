import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

/** Selects all recommended anime from store. */
export const selectRecommendedAnime = createSelector(
	(state: RootState) => state.recommendedAnime.anime,
	anime => anime,
);

/** Selects anime loading state. */
export const selectIsRecommendedAnimeLoading = createSelector(
	(state: RootState) => state.recommendedAnime.anime,
	isLoading => isLoading,
);
