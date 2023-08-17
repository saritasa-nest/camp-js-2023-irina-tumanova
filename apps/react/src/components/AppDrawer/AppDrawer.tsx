import { useUserState } from '@js-camp/react/hooks/useUserState';
import { FC, memo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch } from '@js-camp/react/store';
import { AuthDispatcher } from '@js-camp/react/store/auth/dispatchers';
import { Box, Button } from '@mui/material';
import styles from './AppDrawer.module.css';
import { navigationList } from './AppDrawer.settings';
import { blue } from '@mui/material/colors';

type Props = Readonly<{
	isOpen: boolean;
	close: () => void;
}>;

const AppDrawerComponent: FC<Props> = props => {
	const location = useLocation();
	const { user, isUserLoading, userError } = useUserState();
	const dispatch = useAppDispatch();

	/** Handle logout. */
	const handleLogout = () => {
		dispatch(AuthDispatcher.logout());
	};

	if (user === null) {
		return null;
	}
	return (
		<Drawer open={props.isOpen} onClose={props.close}>
			<Box className={styles['drawer__user-section']} sx={{ backgroundColor: blue[700] }}>
				<Box className={styles['drawer__user']}>
					<Avatar alt={`${user.firstName} avatar`} src={user.avatarUrl} />
					<Typography variant="body1" className={styles['drawer__user-name']}>{user.firstName} {user.lastName}</Typography>
				</Box>
				<Box className={styles['drawer__user-actions']}>
					<Button startIcon={<PersonIcon />} className={styles['drawer__user-action']} color="white">Profile</Button>
					<Button startIcon={<LogoutIcon />} onClick={handleLogout} className={styles['drawer__user-action']} color="white">Log out</Button>
				</Box>

				<CloseIcon className={styles.drawer__close} onClick={props.close} />
			</Box>

			<Box className={styles.drawer__navigation}>
				<List>
					{navigationList.map(navigationItem => (
						<ListItem key={navigationItem.name} disablePadding>
							<ListItemButton component={NavLink} to={navigationItem.link}>
								<ListItemText primary={navigationItem.name} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Box>
		</Drawer>
	);
};

export const AppDrawer = memo(AppDrawerComponent);
