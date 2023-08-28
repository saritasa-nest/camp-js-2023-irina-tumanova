import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

/** Selects all anime from store. */
export const selectAnime = createSelector(
	(state: RootState) => state.anime.anime,
	anime => anime,
);

/** Selects anime loading state. */
export const selectIsAnimeLoading = createSelector(
	(state: RootState) => state.anime.isLoading,
	isLoading => isLoading,
);
