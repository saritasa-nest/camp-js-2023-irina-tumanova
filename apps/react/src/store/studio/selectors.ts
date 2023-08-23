import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

export const selectStudios = createSelector(
	(state: RootState) => state.studios.studios,
	studios => studios,
);

/** Selects studios loading state. */
export const selectAreStudiosLoading = createSelector(
	(state: RootState) => state.studios.isLoading,
	isLoading => isLoading,
);
