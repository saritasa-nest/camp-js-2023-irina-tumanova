import { createSlice } from '@reduxjs/toolkit';

import { fetchAnime } from './dispatchers';
import { initialState } from './state';

export const recommendedAnimeSlice = createSlice({
	name: 'recommendedAnime',
	initialState,
	reducers: {},
	extraReducers: builder => builder
		.addCase(fetchAnime.pending, state => {
			state.isLoading = true;
		})
		.addCase(fetchAnime.fulfilled, (state, action) => {
			state.anime = [...state.anime, ...action.payload];
			state.isLoading = false;
		})
		.addCase(fetchAnime.rejected, (state, action) => {
			if (action.error.message) {
				state.error = action.error.message;
			}
			state.isLoading = false;
		}),
});
