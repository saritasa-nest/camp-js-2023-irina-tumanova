import { FC } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { blue } from '@mui/material/colors';
import { Box, Button } from '@mui/material';

import { useAppDispatch } from '@js-camp/react/store';
import { AuthDispatcher } from '@js-camp/react/store/auth/dispatchers';
import { typedMemo } from '@js-camp/react/utils/typedMemo';
import { useUserState } from '@js-camp/react/hooks/useUserState';

import styles from './AppDrawer.module.css';
import { navigationList } from './AppDrawer.settings';

type Props = Readonly<{

	/** Drawer is open. */
	isOpen: boolean;

	/** Close drawer. */
	close: () => void;
}>;

/**
 * App drawer component.
 * @param props Component props.
 */
const AppDrawerComponent: FC<Props> = props => {
	const { user } = useUserState();
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
				<Box className={styles.drawer__user}>
					<Avatar alt={`${user.firstName} avatar`} src={user.avatarUrl} />
					<Typography variant="body1" className={styles['drawer__user-name']}>
						{user.firstName} {user.lastName}
					</Typography>
				</Box>
				<Box className={styles['drawer__user-actions']}>
					<Button startIcon={<PersonIcon />}
						component={Link}
						to="/profile"
						className={styles['drawer__user-action']}
						color="white">
						Profile
					</Button>
					<Button
						startIcon={<LogoutIcon />}
						onClick={handleLogout}
						className={styles['drawer__user-action']}
						color="white"
					>
						Log out
					</Button>
				</Box>
			</Box>

			<Box className={styles.drawer__navigation}>
				<List>
					{navigationList.map(navigationItem => (
						<ListItem key={navigationItem.name} disablePadding>
							<ListItemButton component={NavLink} to={navigationItem.link} onClick={props.close}>
								<ListItemText primary={navigationItem.name} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Box>
		</Drawer>
	);
};

export const AppDrawer = typedMemo(AppDrawerComponent);
