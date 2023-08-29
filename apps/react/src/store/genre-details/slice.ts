import { createSlice } from '@reduxjs/toolkit';

import { fetchGenreDetails } from './dispatchers';
import { initialState } from './state';

export const genreDetailsSlice = createSlice({
	name: 'genreDetails',
	initialState,
	reducers: {
		clearGenreDetailsErrorsState(state) {
			state.error = undefined;
		},
	},
	extraReducers: builder =>
		builder
			.addCase(fetchGenreDetails.pending, state => {
				state.isLoading = true;
			})
			.addCase(fetchGenreDetails.fulfilled, (state, action) => {
				state.genreDetails = action.payload;
				state.isLoading = false;
			})
			.addCase(fetchGenreDetails.rejected, (state, action) => {
				if (action.error.message) {
					state.error = action.error.message;
				}
				state.isLoading = false;
			}),
});

export const { clearGenreDetailsErrorsState } = genreDetailsSlice.actions;
