import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

import { BasePage } from '../BasePage';
import { GenreDetailsPage } from './pages/GenreDetailsPage';

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
				path: ':id',
				element: <GenreDetailsPage />,
			},
		],
	},
	{
		path: '*',
		element: <Navigate to="GenresPage" />,
	},
];
