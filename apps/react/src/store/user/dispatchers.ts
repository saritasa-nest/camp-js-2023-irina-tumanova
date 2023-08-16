import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { UserService } from '@js-camp/react/api/services/user';

export namespace UserDispatcher {
	export const getCurrentUser = createAsyncThunk(
		'user/getCurrentUser',
		() => UserService.getCurrentUser(),
	);

	export const reset = createAction('user/reset');
}
