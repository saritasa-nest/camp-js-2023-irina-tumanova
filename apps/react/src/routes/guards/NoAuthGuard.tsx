import { FC } from 'react';
import { Navigate, Outlet, To } from 'react-router-dom';
import { useAppSelector } from '@js-camp/react/store';
import { selectIsAuth } from '@js-camp/react/store/auth/selectors';
import { UserSecretService } from '@js-camp/react/api/services/userSecretService';

export const NoAuthGuard: FC = () => {
	const hasToken = UserSecretService.hasToken();
	const isAuthorized = useAppSelector(selectIsAuth);

	if (isAuthorized || hasToken) {
		const redirect: To = {
			pathname: '/',
		};

		return <Navigate to={redirect} replace/>;
	}

	return <Outlet />;
};
