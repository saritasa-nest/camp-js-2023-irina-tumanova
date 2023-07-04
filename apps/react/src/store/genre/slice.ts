import { createSlice } from '@reduxjs/toolkit';

import { fetchGenres } from './dispatchers';
import { initialState } from './state';

export const genresSlice = createSlice({
	name: 'genres',
	initialState,
	reducers: {},
	extraReducers: builder => builder
		.addCase(fetchGenres.pending, state => {
			state.isLoading = true;
		})
		.addCase(fetchGenres.fulfilled, (state, action) => {
			state.genres = action.payload;
			state.isLoading = false;
		})
		.addCase(fetchGenres.rejected, (state, action) => {
			if (action.error.message) {
				state.error = action.error.message;
			}
			state.isLoading = false;
		}),
});
