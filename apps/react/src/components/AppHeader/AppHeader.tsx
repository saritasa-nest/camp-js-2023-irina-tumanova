import { FC, memo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Box, Button, Toolbar } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import { AuthDispatcher } from '@js-camp/react/store/auth/dispatchers';
import { useAppDispatch } from '@js-camp/react/store';
import { useUserState } from '@js-camp/react/hooks/useUserState';

import { AppDrawer } from '../AppDrawer';

/** App header component. */
const AppHeaderComponent: FC = () => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const { user } = useUserState();
	const dispatch = useAppDispatch();

	/** Handle logout. */
	const handleLogout = () => {
		dispatch(AuthDispatcher.logout());
	};

	return (
		<AppBar sx={{ position: 'relative' }}>
			<Toolbar>

				<Button onClick={() => setIsDrawerOpen(true)}></Button>
				<AppDrawer isOpen={isDrawerOpen} close={() => setIsDrawerOpen(false)} />
				<Button
					component={NavLink}
					color="inherit"
					variant="outlined"
					to="/anime">
					Anime
				</Button>

				<Box sx={{ flexGrow: 1 }} />
				{user !== null ?
					<Button
						endIcon={<LogoutIcon />}
						color="inherit"
						variant="outlined"
						onClick={handleLogout}>
						Logout
					</Button> :

					<Button
						component={NavLink}
						endIcon={<LoginIcon />}
						color="inherit"
						variant="outlined"
						to="/auth/login">
						Login
					</Button>}
			</Toolbar>
		</AppBar>
	);
};

export const AppHeader = memo(AppHeaderComponent);
