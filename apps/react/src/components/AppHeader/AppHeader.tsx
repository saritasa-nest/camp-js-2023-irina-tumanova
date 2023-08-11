import { FC, memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { AppBar, Box, Button, Toolbar } from '@mui/material';
import { AuthDispatcher } from '@js-camp/react/store/auth/dispatchers';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import { selectUser } from '@js-camp/react/store/user/selectors';
import { UserDispatcher } from '@js-camp/react/store/user/dispatchers';
import { selectIsAuth } from '@js-camp/react/store/auth/selectors';

const AppHeaderComponent: FC = () => {
	const user = useSelector(selectUser);
	const isAuth = useAppSelector(selectIsAuth);
	const dispatch = useAppDispatch();

	const handleLogout = () => {
		dispatch(AuthDispatcher.logout());
		dispatch(UserDispatcher.reset());
	};

	useEffect(() => {
		if (isAuth && user === null) {
			dispatch(UserDispatcher.getCurrentUser());
		}
	}, [isAuth]);

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
