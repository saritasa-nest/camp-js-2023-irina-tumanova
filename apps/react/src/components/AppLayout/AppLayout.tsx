import { FC, memo } from 'react';
import { Outlet } from 'react-router-dom';
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

export const AppLayout = memo(AppLayoutComponent);
