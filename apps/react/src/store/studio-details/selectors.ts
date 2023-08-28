import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

/** Selects studio details from store. */
export const selectStudioDetails = createSelector(
	(state: RootState) => state.studioDetails.studioDetails,
	genre => genre,
);

/** Selects studio details loading state. */
export const selectAreStudioDetailsLoading = createSelector(
	(state: RootState) => state.studioDetails.isLoading,
	isLoading => isLoading,
);

/** Selects studio details errors. */
export const selectStudioDetailsErrors = createSelector(
	(state: RootState) => state.studioDetails.error,
	error => error,
);
