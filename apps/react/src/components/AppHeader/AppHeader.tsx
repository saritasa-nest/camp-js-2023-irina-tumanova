import { FC, memo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Avatar, Box, Toolbar, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import { useUserState } from '@js-camp/react/hooks/useUserState';
import { AppDrawer } from '../AppDrawer';
import styles from './AppHeader.module.css';

/** App header component. */
const AppHeaderComponent: FC = () => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const { user } = useUserState();

	return (
		<AppBar className={styles['app-header']}>
			<Toolbar>
				{user !== null ?
					<div className={styles['app-header__menu-trigger']} onClick={() => setIsDrawerOpen(true)}>
						<Avatar alt={`${user.firstName} avatar`} src={user.avatarUrl} />
						<Typography variant="body1">Hi, {user.firstName}</Typography>
					</div> :
					<NavLink to="/login" className={styles['app-header__login-trigger']}>
						<LoginIcon className={styles['app-header__login-icon']} />
						<Typography variant="body1">Login</Typography>
					</NavLink>}

				<AppDrawer isOpen={isDrawerOpen} close={() => setIsDrawerOpen(false)} />

				<Box sx={{ flexGrow: 1 }} />
			</Toolbar>
		</AppBar>
	);
};

export const AppHeader = memo(AppHeaderComponent);
