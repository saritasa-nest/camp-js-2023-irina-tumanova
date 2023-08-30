import { createSlice } from '@reduxjs/toolkit';

import { fetchStudioDetails } from './dispatchers';
import { initialState } from './state';

export const studioDetailsSlice = createSlice({
	name: 'studioDetails',
	initialState,
	reducers: {
		clearStudioDetailsErrorsState(state) {
			state.error = undefined;
		},
	},
	extraReducers: builder =>
		builder
			.addCase(fetchStudioDetails.pending, state => {
				state.isLoading = true;
			})
			.addCase(fetchStudioDetails.fulfilled, (state, action) => {
				state.studioDetails = action.payload;
				state.isLoading = false;
			})
			.addCase(fetchStudioDetails.rejected, (state, action) => {
				if (action.error.message) {
					state.error = action.error.message;
				}
				state.isLoading = false;
			}),
});

export const { clearStudioDetailsErrorsState } = studioDetailsSlice.actions;
