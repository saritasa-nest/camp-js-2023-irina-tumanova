import { useEffect } from 'react';

import { User } from '@js-camp/core/models/user/user';
import { AppValidationError } from '@js-camp/core/models/app-error';
import { LoginValidationErrors } from '@js-camp/core/models/auth/login';
import { RegistrationValidationErrors } from '@js-camp/core/models/auth/registration';

import { useAppDispatch, useAppSelector } from '../store';
import { selectIsAuthLoading } from '../store/auth/selectors';
import { selectIsUserLoading, selectUser, selectUserError } from '../store/user/selectors';
import { UserSecretService } from '../api/services/userSecret';
import { UserDispatcher } from '../store/user/dispatchers';

interface UserState {

	/** Current user. */
	readonly user: User | null;

	/** User is loading. */
	readonly isLoading: boolean;

	/** User error. */
	readonly error: AppValidationError<LoginValidationErrors | RegistrationValidationErrors> | undefined;
}

/** Use user state. */
export const useUserState = (): UserState => {
	/** Is auth loading. */
	const isAuthLoading = useAppSelector(selectIsAuthLoading);

	/** Current user. */
	const user = useAppSelector(selectUser);

	/** User is loading. */
	const isUserLoading = useAppSelector(selectIsUserLoading);

	/** User error. */
	const userError = useAppSelector(selectUserError);

	const dispacth = useAppDispatch();

	useEffect(() => {
		if (isAuthLoading) {
			return;
		}

		dispacth(UserSecretService.hasToken() ? UserDispatcher.getCurrentUser() : UserDispatcher.reset());
	}, [isAuthLoading]);

	return {
		user,
		isUserLoading,
		userError,
	};
};
