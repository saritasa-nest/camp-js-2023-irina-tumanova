import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserService } from '@js-camp/react/api/services/userService';

export namespace UserDispatcher {
	export const getCurrentUser = createAsyncThunk(
		'user/getCurrentUser',
		() => UserService.getCurrentUser(),
	);
}
