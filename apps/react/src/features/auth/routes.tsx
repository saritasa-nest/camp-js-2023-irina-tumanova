import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

const LoginPage = lazy(() => import('./pages/LoginPage').then(module => ({ default: module.LoginPage })));
const RegistrationPage = lazy(() =>
	import('./pages/RegistrationPage').then(module => ({ default: module.RegistrationPage })));

export const authRoutes: RouteObject[] = [
	{
		path: 'auth',
		children: [
			{ path: 'login', element: <LoginPage/> },
			{ path: 'registration', element: <RegistrationPage/> },
			{ path: '*', element: <Navigate to="LoginPage"/> },
		],
	},
];
