import { FC, memo } from 'react';
import { CircularProgress } from '@mui/material';
import { createPortal } from 'react-dom';

import classes from './AppShadowLoader.module.css';

/** App shadow loader component. */
const AppShadowLoaderComponent: FC = () => {
	const appShadowLoaderRoot = document.querySelector('#app-shadow-loader-root');

	if (appShadowLoaderRoot === null) {
		return null;
	}
	return createPortal(
		<div className={`${classes['app-shadow-loader']}`}>
			<CircularProgress />
		</div>,
		appShadowLoaderRoot,
	);
};

export const AppShadowLoader = memo(AppShadowLoaderComponent);
