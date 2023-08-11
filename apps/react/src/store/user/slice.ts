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
			state.isLoading = true;
			state.user = action.payload;
			state.error = undefined;
		})
		.addCase(UserDispatcher.getCurrentUser.rejected, (state, action) => {
			if (action.error.message) {
				state.error = action.error.message;
			}
			state.isLoading = false;
		}),
});
