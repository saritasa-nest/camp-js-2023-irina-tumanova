import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { AuthService } from '@js-camp/react/api/services/authServices';
import { Login } from '@js-camp/core/models/auth/login';
import { Registration } from '@js-camp/core/models/auth/registration';
import { LoginMapper } from '@js-camp/core/mappers/auth/login.mapper';
import { RegistrationMapper } from '@js-camp/core/mappers/auth/registration.mapper';
import { UserSecretService } from '@js-camp/react/api/services/userSecretService';

export namespace AuthDispatcher {
	export const login = createAsyncThunk(
		'auth/login',
		async(credential: Login, { rejectWithValue }) => {
			try {
				await AuthService.login(credential);
			} catch (error: unknown) {
				return rejectWithValue(AuthService.mapError(error, LoginMapper.validateErrorFromDto));
			}
		},
	);

	export const register = createAsyncThunk(
		'auth/register',
		async(credential: Registration, { rejectWithValue }) => {
			try {
				await AuthService.register(credential);
			} catch (error: unknown) {
				return rejectWithValue(AuthService.mapError(error, RegistrationMapper.validateErrorFromDto));
			}
		},
	);

	export const logout = createAsyncThunk(
		'auth/logout',
		() => AuthService.logout(),
	);

	export const reset = createAction('auth/reset');

	export const loginAuto = createAsyncThunk(
		'auth/loginAuto',
		async() => {
			try {
				const token = await UserSecretService.getToken();
				if (token === null) {
					throw new Error('No token');
				}
				await AuthService.verifySecret(token);
			} catch (error: unknown) {
				await AuthService.logout();
				throw error;
			}
		},
	);
}
