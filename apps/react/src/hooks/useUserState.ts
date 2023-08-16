import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../store';
import { selectIsAuthLoading } from '../store/auth/selectors';
import { selectIsUserLoading, selectUser, selectUserError } from '../store/user/selectors';
import { UserSecretService } from '../api/services/userSecret';
import { UserDispatcher } from '../store/user/dispatchers';

/** Use user state. */
export const useUserState = () => {

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

		const hasToken = UserSecretService.hasToken();
		dispacth(hasToken ? UserDispatcher.getCurrentUser() : UserDispatcher.reset());
	}, [isAuthLoading]);

	return {
		/** Current user. */
		user,

		/** User is loading. */
		isUserLoading,

		/** User error. */
		userError,
	};
};
