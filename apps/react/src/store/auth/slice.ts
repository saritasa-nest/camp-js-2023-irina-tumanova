import { createSlice } from '@reduxjs/toolkit';

import { login, register } from './dispatchers';
import { initialState } from './state';

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: builder => builder
		.addCase(login.pending, state => {
			state.isLoading = true;
			state.isAuth = false;
			state.error = undefined;
		})
		.addCase(register.pending, state => {
			state.isLoading = true;
			state.isAuth = false;
			state.error = undefined;
		})
		.addCase(login.fulfilled, state => {
			state.isLoading = false;
			state.isAuth = true;
			state.error = undefined;
		})
		.addCase(register.fulfilled, state => {
			state.isLoading = false;
			state.isAuth = true;
			state.error = undefined;
		})
		.addCase(login.rejected, (state, action) => {
			if (action.error.message) {
				state.error = action.error.message;
			}
			state.isAuth = false;
			state.isLoading = false;
		})
		.addCase(register.rejected, (state, action) => {
			if (action.error.message) {
				state.error = action.error.message;
			}
			state.isAuth = false;
			state.isLoading = false;
		}),
});
