import { createSlice } from '@reduxjs/toolkit';

import { fetchRecommendedAnime } from './dispatchers';
import { initialState } from './state';

export const recommendedAnimeSlice = createSlice({
	name: 'recommendedAnime',
	initialState,
	reducers: {},
	extraReducers: builder => builder
		.addCase(fetchRecommendedAnime.pending, state => {
			state.isLoading = true;
		})
		.addCase(fetchRecommendedAnime.fulfilled, (state, action) => {
			state.anime = action.payload;
			state.isLoading = false;
		})
		.addCase(fetchRecommendedAnime.rejected, (state, action) => {
			if (action.error.message) {
				state.error = action.error.message;
			}
			state.isLoading = false;
		}),
});
