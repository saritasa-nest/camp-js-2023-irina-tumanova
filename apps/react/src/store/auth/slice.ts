import { createSlice } from '@reduxjs/toolkit';

import { AppValidationError } from '@js-camp/core/models/app-error';

import { AuthDispatcher } from './dispatchers';
import { initialState } from './state';

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: builder => builder
		.addCase(AuthDispatcher.login.pending, state => {
			state.isLoading = true;
			state.error = undefined;
		})
		.addCase(AuthDispatcher.register.pending, state => {
			state.isLoading = true;
			state.error = undefined;
		})
		.addCase(AuthDispatcher.login.fulfilled, state => {
			state.isLoading = false;
			state.error = undefined;
		})
		.addCase(AuthDispatcher.register.fulfilled, state => {
			state.isLoading = false;
			state.error = undefined;
		})
		.addCase(AuthDispatcher.login.rejected, (state, action) => {
			if (action.payload instanceof AppValidationError) {
				state.error = action.payload;
			}
			state.isLoading = false;
		})
		.addCase(AuthDispatcher.register.rejected, (state, action) => {
			if (action.payload instanceof AppValidationError) {
				state.error = action.payload;
			}
			state.isLoading = false;
		})
		.addCase(AuthDispatcher.logout.fulfilled, state => {
			state.isLoading = false;
			state.error = undefined;
		})
		.addCase(AuthDispatcher.reset, state => {
			state.isLoading = false;
			state.error = undefined;
		}),
});
