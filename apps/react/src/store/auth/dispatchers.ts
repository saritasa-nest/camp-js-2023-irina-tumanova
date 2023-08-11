import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { AuthService } from '@js-camp/react/api/services/authServices';
import { Login } from '@js-camp/core/models/auth/login';
import { Registration } from '@js-camp/core/models/auth/registration';
import { AxiosError } from 'axios';
import { AppErrorDictionaryMapper } from '@js-camp/core/mappers/app-error.mapper';
import { LoginMapper } from '@js-camp/core/mappers/auth/login.mapper';
import { RegistrationMapper } from '@js-camp/core/mappers/auth/registration.mapper';

export namespace AuthDispatcher {
	export const login = createAsyncThunk(
		'auth/login',
		async(credential: Login, { rejectWithValue }) => {
			try {
				await AuthService.login(credential);
			} catch (error: unknown) {
				if (error instanceof AxiosError && error.response !== undefined) {
					const { data } = error.response;
					if (data.errors instanceof Array) {
						return rejectWithValue(AppErrorDictionaryMapper.fromDto(
							data.errors,
							LoginMapper.validateErrorFromDto,
						));
					}
				}

				throw error;
			}
		},
	);

	export const register = createAsyncThunk(
		'auth/register',
		async(credential: Registration, { rejectWithValue }) => {
			try {
				await AuthService.register(credential);
			} catch (error: unknown) {
				if (error instanceof AxiosError && error.response !== undefined) {
					const { data } = error.response;
					if (data.errors instanceof Array) {
						rejectWithValue(AppErrorDictionaryMapper.fromDto(
							data.errors,
							RegistrationMapper.validateErrorFromDto,
						));
					}
				}
				throw error;
			}
		},
	);

	export const logout = createAction('auth/logout');
}
