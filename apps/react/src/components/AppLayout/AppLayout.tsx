import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { typedMemo } from '@js-camp/react/utils/typedMemo';

import { AppHeader } from '../AppHeader';
import styles from './AppLayout.module.css';

const AppLayoutComponent: FC = () => (
	<>
		<div id='app-shadow-loader-root'></div>
		<AppHeader />
		<main className={styles['app-main']}>
			<Outlet />
		</main>
	</>
);

export const AppLayout = typedMemo(AppLayoutComponent);
