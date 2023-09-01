import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

/** Selects studio details state. */
export const selectStudioDetails = createSelector(
	(state: RootState) => state.studioDetails,
	state => ({
		isLoading: state.isLoading,
		studiosDetails: state.studioDetails,
		error: state.error,
	}),
);

/** Selects studio details error from store. */
export const selectStudioDetailsErrors = createSelector(
	(state: RootState) => state.studioDetails.error,
	error => error,
);
