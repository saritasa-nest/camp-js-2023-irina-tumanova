import { FC } from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

import { genresRoutes } from '../features/genres/routes';
import { authRoutes } from '../features/auth/routes';
import { AppLayout } from '../components/AppLayout/AppLayout';
import { AuthGuard, NoAuthGuard } from './guards';

const routes: RouteObject[] = [
	{
		path: '/',
		element: <AppLayout />,
		children: [
			{
				element: <AuthGuard />,
				children: [
					{
						path: '/',
						element: <div>Main</div>,
					},
					...genresRoutes,
				],
			},
			{
				element: <NoAuthGuard />,
				children: [...authRoutes],
			},
			{
				path: '*',
				element: <Navigate to="/" />,
			},
		],
	},

];

/** Root router component. */
export const RootRouter: FC = () => useRoutes(routes);
