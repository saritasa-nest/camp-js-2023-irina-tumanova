import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';

import { typedMemo } from '@js-camp/react/utils/typedMemo';

import styles from './AppNoAuthHeader.module.css';

/** App no auth header component. */
const AppNoAuthHeaderComponent: FC = () => (
	<AppBar className={styles['app-no-auth-header']}>
		<Toolbar>
			<NavLink to="/login" className={styles['app-no-auth-header__login-trigger']}>
				<LoginIcon className={styles['app-no-auth-header__login-icon']} />
				<Typography variant="body1">Login</Typography>
			</NavLink>
		</Toolbar>
	</AppBar>
);

export const AppNoAuthHeader = typedMemo(AppNoAuthHeaderComponent);
