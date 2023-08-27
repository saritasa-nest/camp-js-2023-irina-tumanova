import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

const ProfilePage = lazy(() => import('./pages/ProfilePage').then(module => ({ default: module.ProfilePage })));

export const userRoutes: RouteObject[] = [
	{
		path: 'profile',
		element: <ProfilePage />,
	},
	{
		path: '*',
		element: <Navigate to="ProfilePage" />,
	},
];
