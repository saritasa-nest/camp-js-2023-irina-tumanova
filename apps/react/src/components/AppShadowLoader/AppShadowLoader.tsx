import { FC, memo } from 'react';
import { createPortal } from 'react-dom';
import { CircularProgress } from '@mui/material';

import styles from './AppShadowLoader.module.css';

/** App shadow loader component. */
const AppShadowLoaderComponent: FC = () => {
	const appShadowLoaderRoot = document.querySelector('#app-shadow-loader-root');

	if (appShadowLoaderRoot === null) {
		return null;
	}
	return createPortal(
		<div className={styles['app-shadow-loader']}>
			<CircularProgress />
		</div>,
		appShadowLoaderRoot,
	);
};

export const AppShadowLoader = memo(AppShadowLoaderComponent);
