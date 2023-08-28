import { FC } from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

import { animeRoutes } from '../features/anime/routes';
import { genresRoutes } from '../features/genres/routes';
import { authRoutes } from '../features/auth/routes';
import { AppLayout } from '../components/AppLayout/AppLayout';
import { AuthGuard, NoAuthGuard } from './guards';
import { studiosRoutes } from '../features/studios/routes';
import { MainPage } from '../features/MainPage/MainPage';

const routes: RouteObject[] = [
	{
		path: '/',
		element: <AppLayout />,
		children: [
			{
				element: <AuthGuard />,
				children: [
					{
						index: true,
						element: <MainPage />,
					},
					...genresRoutes,
					...animeRoutes,
					...studiosRoutes,
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
