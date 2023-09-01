import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

import { BasePage } from '../BasePage';
import { AnimeDetails } from './components/AnimeDetails';

const AnimePage = lazy(() => import('./pages/AnimePage').then(module => ({ default: module.AnimePage })));

export const animeRoutes: RouteObject[] = [
	{
		path: 'anime',
		element: <AnimePage />,
		children: [
			{
				index: true,
				element: <BasePage />,
			},
			{
				path: ':id',
				element: <AnimeDetails />,
			},
		],
	},
	{
		path: '*',
		element: <Navigate to="anime" />,
	},
];
