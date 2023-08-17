import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

import { StudiosPage } from './pages/StudiosPage';

const GenresPage = lazy(() => import('./pages/GenresPage').then(module => ({ default: module.GenresPage })));

export const genresRoutes: RouteObject[] = [
	{
		path: 'genres',
		element: <GenresPage />,
	},
	{
		path: 'studios',
		element: <StudiosPage/>,
	},
	{
		path: '*',
		element: <Navigate to="GenresPage" />,
	},
];
