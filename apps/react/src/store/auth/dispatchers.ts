import { createAsyncThunk } from '@reduxjs/toolkit';

import { AuthService } from '@js-camp/react/api/services/authServices';
import { Login } from '@js-camp/core/models/auth/login';
import { Registration } from '@js-camp/core/models/auth/registration';

export const login = createAsyncThunk(
	'auth/login',
	(credential: Login) => AuthService.login(credential),
);

export const register = createAsyncThunk(
	'auth/register',
	(credential: Registration) => AuthService.register(credential),
);
