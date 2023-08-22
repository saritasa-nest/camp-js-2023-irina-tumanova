import { FC } from 'react';
import { Navigate, Outlet, To } from 'react-router-dom';

import { UserSecretService } from '@js-camp/react/api/services/userSecret';

/** No auth guard. */
export const NoAuthGuard: FC = () => {
	const hasToken = UserSecretService.hasToken();

	if (hasToken) {
		const redirect: To = {
			pathname: '/',
		};

		return <Navigate to={redirect} replace />;
	}

	return <Outlet />;
};
