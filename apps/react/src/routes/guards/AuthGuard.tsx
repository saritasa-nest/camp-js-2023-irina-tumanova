import { FC } from 'react';
import { Navigate, Outlet, To } from 'react-router-dom';

import { useAppDispatch } from '@js-camp/react/store';
import { UserDispatcher } from '@js-camp/react/store/user/dispatchers';
import { UserSecretService } from '@js-camp/react/api/services/userSecret';
import { useUserState } from '@js-camp/react/hooks/useUserState';

/** Auth guard. */
export const AuthGuard: FC = () => {
	const dispatch = useAppDispatch();
	const hasToken = UserSecretService.hasToken();
	const { user, isLoading } = useUserState();

	if (!hasToken) {
		const redirect: To = {
			pathname: 'auth/login',
		};
		return <Navigate to={redirect} replace />;
	}

	if (user === null) {
		if (!isLoading) {
			dispatch(UserDispatcher.getCurrentUser());
		}

		return <div>Fetch User</div>;
	}

	return <Outlet />;
};
