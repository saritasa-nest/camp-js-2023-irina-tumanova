import { FC } from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

import { genresRoutes } from '../features/genres/routes';
import { authRoutes } from '../features/auth/routes';

const routes: RouteObject[] = [
	{
		path: '*',
		element: <Navigate to="/genres" />,
	},
	...genresRoutes,
	...authRoutes,
];

/** Root router component. */
export const RootRouter: FC = () => useRoutes(routes);
