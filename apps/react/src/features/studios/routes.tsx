import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

import { BasePage } from '../BasePage';
import { StudioDetailsPage } from './pages/StudioDetailsPage';

const StudiosPage = lazy(() => import('./pages/StudiosPage').then(module => ({ default: module.StudiosPage })));

export const studiosRoutes: RouteObject[] = [
	{
		path: 'studios',
		element: <StudiosPage />,
		children: [
			{
				index: true,
				element: <BasePage />,
			},
			{
				path: ':id',
				element: <StudioDetailsPage />,
			},
		],
	},
	{
		path: '*',
		element: <Navigate to="studios" />,
	},
];
