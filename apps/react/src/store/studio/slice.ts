import { createSlice } from '@reduxjs/toolkit';

import { initialState } from './state';
import { fetchStudios } from './dispatchers';

export const studiosSlice = createSlice({
	name: 'studios',
	initialState,
	reducers: {},
	extraReducers: builder =>
		builder
			.addCase(fetchStudios.pending, state => {
				state.isLoading = true;
			})
			.addCase(fetchStudios.fulfilled, (state, action) => {
				state.studios = action.payload;
				state.isLoading = false;
			})
			.addCase(fetchStudios.rejected, (state, action) => {
				if (action.error.message) {
					state.error = action.error.message;
				}
				state.isLoading = false;
			}),
});
