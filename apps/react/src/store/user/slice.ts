import { createSlice } from '@reduxjs/toolkit';

import { UserDispatcher } from './dispatchers';
import { initialState } from './state';

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: builder => builder
		.addCase(UserDispatcher.getCurrentUser.pending, state => {
			state.isLoading = true;
			state.user = null;
			state.error = undefined;
		})
		.addCase(UserDispatcher.getCurrentUser.fulfilled, (state, action) => {
			state.isLoading = false;
			state.user = action.payload;
			state.error = undefined;
		})
		.addCase(UserDispatcher.getCurrentUser.rejected, (state, action) => {
			if (action.error.message) {
				state.error = action.error.message;
			}
			state.isLoading = false;
		})
		.addCase(UserDispatcher.reset, state => {
			state.error = undefined;
			state.isLoading = false;
			state.user = null;
		})
		.addCase(UserDispatcher.updateCurrentUser.fulfilled, (state, action) => {
			state.user = action.payload;
		}),
});
