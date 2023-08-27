import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { UserService } from '@js-camp/react/api/services/user';
import { User } from '@js-camp/core/models/user/user';

interface UpdateUserProps {

	/** User. */
	readonly user: User;

	/** Image file. */
	readonly image: File | null;
}

export namespace UserDispatcher {
	export const getCurrentUser = createAsyncThunk(
		'user/getCurrentUser',
		() => UserService.getCurrentUser(),
	);

	export const reset = createAction('user/reset');

	export const updateCurrentUser = createAsyncThunk(
		'user/updateCurrentUser',
		({ image, user }: UpdateUserProps) => UserService.updateCurrentUser(image, user),
	);
}
