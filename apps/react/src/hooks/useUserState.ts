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
	const isLoading = useAppSelector(selectIsUserLoading);

	/** User error. */
	const error = useAppSelector(selectUserError);

	const dispacth = useAppDispatch();

	useEffect(() => {
		if (isAuthLoading) {
			return;
		}

		const hasToken = UserSecretService.hasToken();

		if (hasToken && user == null && !isLoading) {
			dispacth(UserDispatcher.getCurrentUser());
		}
		if (!hasToken) {
			dispacth(UserDispatcher.reset());
		}
	}, [isAuthLoading]);

	return {
		user,
		isLoading,
		error,
	};
};
