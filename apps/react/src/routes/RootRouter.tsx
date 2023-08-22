import { FC } from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

import { animeRoutes } from '../features/anime/routes';
import { genresRoutes } from '../features/genres/routes';
import { authRoutes } from '../features/auth/routes';
import { AuthGuard, NoAuthGuard } from './guards';

const routes: RouteObject[] = [
	{
		path: '*',
		element: <Navigate to="/anime" />,
	},
	{
		element: <AuthGuard/>,
		children: [...genresRoutes],
	},
	{
		element: <AuthGuard/>,
		children: [...animeRoutes],
	},
	{
		element: <NoAuthGuard/>,
		children: [...authRoutes],
	},
];

/** Root router component. */
export const RootRouter: FC = () => useRoutes(routes);
