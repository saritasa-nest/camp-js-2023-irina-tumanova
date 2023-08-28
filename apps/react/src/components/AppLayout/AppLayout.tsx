import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Toolbar } from '@mui/material';

import { typedMemo } from '@js-camp/react/utils/typedMemo';

import { AppHeader } from '../AppHeader';
import styles from './AppLayout.module.css';

const AppLayoutComponent: FC = () => (
	<>
		<div id="app-shadow-loader-root" />
		<AppHeader />
		<main className={styles['app-main']}>
			<Toolbar />
			<Outlet />
		</main>
	</>
);

export const AppLayout = typedMemo(AppLayoutComponent);
