import { FC } from 'react';
import { Navigate, Outlet, To } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { selectIsAuth } from '@js-camp/react/store/auth/selectors';
import { selectUser } from '@js-camp/react/store/user/selectors';
import { UserDispatcher } from '@js-camp/react/store/user/dispatchers';
import { UserSecretService } from '@js-camp/react/api/services/userSecretService';

export const AuthGuard: FC = () => {
	const dispatch = useAppDispatch();
	const hasToken = UserSecretService.hasToken();
	const isAuth = useAppSelector(selectIsAuth);
	const user = useAppSelector(selectUser);

	if (hasToken && user === null) {
		dispatch(UserDispatcher.getCurrentUser());
		return <div>Fetching User...</div>;
	}
	if (!isAuth && !hasToken) {
		const redirect: To = {
			pathname: 'auth/login',
		};
		return <Navigate to={redirect} replace/>;
	}
	return <Outlet />;
};
