import { createSlice } from '@reduxjs/toolkit';

import { AuthDispatcher } from './dispatchers';
import { initialState } from './state';

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: builder => builder
		.addCase(AuthDispatcher.login.pending, state => {
			state.isLoading = true;
			state.isAuth = false;
			state.error = undefined;
		})
		.addCase(AuthDispatcher.register.pending, state => {
			state.isLoading = true;
			state.isAuth = false;
			state.error = undefined;
		})
		.addCase(AuthDispatcher.login.fulfilled, state => {
			state.isLoading = false;
			state.isAuth = true;
			state.error = undefined;
		})
		.addCase(AuthDispatcher.register.fulfilled, state => {
			state.isLoading = false;
			state.isAuth = true;
			state.error = undefined;
		})
		.addCase(AuthDispatcher.login.rejected, (state, action) => {
			if (action.error.message) {
				state.error = action.error.message;
			}
			console.log(action);
			state.isAuth = false;
			state.isLoading = false;
		})
		.addCase(AuthDispatcher.register.rejected, (state, action) => {
			if (action.error.message) {
				state.error = action.error.message;
			}
			console.log(action);
			state.isAuth = false;
			state.isLoading = false;
		})
		.addCase(AuthDispatcher.logout, state => {
			state.isAuth = false;
			state.isLoading = false;
			state.error = undefined;
		}),
});
