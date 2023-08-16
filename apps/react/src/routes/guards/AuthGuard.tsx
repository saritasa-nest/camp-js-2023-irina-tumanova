import { FC } from 'react';
import { Navigate, Outlet, To } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { selectUser } from '@js-camp/react/store/user/selectors';
import { UserDispatcher } from '@js-camp/react/store/user/dispatchers';
import { UserSecretService } from '@js-camp/react/api/services/userSecret';

/** Auth guard. */
export const AuthGuard: FC = () => {
	const dispatch = useAppDispatch();
	const hasToken = UserSecretService.hasToken();
	const user = useAppSelector(selectUser);

	if (hasToken && user === null) {
		dispatch(UserDispatcher.getCurrentUser());
		return <div>Fetch User</div>;
	}
	if (!hasToken) {
		const redirect: To = {
			pathname: 'auth/login',
		};
		return <Navigate to={redirect} replace />;
	}
	return <Outlet />;
};