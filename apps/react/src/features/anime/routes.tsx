import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

const AnimePage = lazy(() => import('./pages/AnimePage').then(module => ({ default: module.AnimePage })));

export const animeRoutes: RouteObject[] = [
	{
		path: 'anime',
		element: <AnimePage />,
	},
	{
		path: '*',
		element: <Navigate to="AnimePage" />,
	},
];
