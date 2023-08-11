import { FC, memo } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { AppBar, Box, Button, Toolbar } from '@mui/material';
import { AuthDispatcher } from '@js-camp/react/store/auth/dispatchers';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import { selectUser } from '@js-camp/react/store/user/selectors';
import { UserDispatcher } from '@js-camp/react/store/user/dispatchers';

const AppHeaderComponent: FC = () => {
	const user = useAppSelector(selectUser);
	const dispatch = useAppDispatch();

	const handleLogout = () => {
		dispatch(AuthDispatcher.logout());
		dispatch(UserDispatcher.reset());
	};

	return (
		<AppBar sx={{ position: 'relative' }}>
			<Toolbar>
				<Button
					component={NavLink}
					color="inherit"
					variant="outlined"
					to="/anime">
					Anime
				</Button>

				<Box sx={{ flexGrow: 1 }}/>
				{user !== null ?
					<Button
						endIcon={<LogoutIcon/>}
						color="inherit"
						variant="outlined"
						onClick={handleLogout}>
					Logout
					</Button> :

					<Button
						component={NavLink}
						endIcon={<LoginIcon/>}
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
