import { createSlice } from '@reduxjs/toolkit';
import { castDraft } from 'immer';

import { fetchAnimeDetails } from './dispatchers';
import { initialState } from './state';

export const animeDetailsSlice = createSlice({
	name: 'animeDetails',
	initialState,
	reducers: {
		clearAnimeDetailsErrorsState(state) {
			state.error = undefined;
		},
	},
	extraReducers: builder => builder
		.addCase(fetchAnimeDetails.pending, state => {
			state.isLoading = true;
		})
		.addCase(fetchAnimeDetails.fulfilled, (state, action) => {
			state.animeDetails = castDraft(action.payload);
			state.isLoading = false;
		})
		.addCase(fetchAnimeDetails.rejected, (state, action) => {
			if (action.error.message) {
				state.error = action.error.message;
			}
			state.isLoading = false;
		}),
});

export const { clearAnimeDetailsErrorsState } = animeDetailsSlice.actions;
