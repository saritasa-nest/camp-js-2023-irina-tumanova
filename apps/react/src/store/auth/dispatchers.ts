import { createAsyncThunk } from '@reduxjs/toolkit';

import { AuthService } from '@js-camp/react/api/services/auth';
import { Login } from '@js-camp/core/models/auth/login';
import { Registration } from '@js-camp/core/models/auth/registration';

export namespace AuthDispatcher {
	export const login = createAsyncThunk('auth/login', async(credential: Login, { rejectWithValue }) => {
		try {
			return await AuthService.login(credential);
		} catch (error: unknown) {
			return rejectWithValue(error);
		}
	});

	export const register = createAsyncThunk('auth/register', async(credential: Registration, { rejectWithValue }) => {
		try {
			return await AuthService.register(credential);
		} catch (error: unknown) {
			return rejectWithValue(error);
		}
	});

	export const logout = createAsyncThunk('auth/logout', () => AuthService.logout());
}
