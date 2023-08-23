import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

import { BasePage } from '../BasePage';

const GenresPage = lazy(() => import('./pages/GenresPage').then(module => ({ default: module.GenresPage })));

export const genresRoutes: RouteObject[] = [
	{
		path: 'genres',
		element: <GenresPage />,
		children: [
			{
				index: true,
				element: <BasePage />,
			},
			{
				index: true,
				element: <BasePage />,
			},
		],
	},
	{
		path: '*',
		element: <Navigate to="GenresPage" />,
	},
];
