import { useUserState } from '@js-camp/react/hooks/useUserState';
import { FC, memo } from 'react';
import { NavLink, useLocation, useMatch, useNavigation } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Link from '@mui/material/Link';
import CloseIcon from '@mui/icons-material/Close';

import styles from './AppDrawer.module.css';
import { navigationList } from './AppDrawer.settings';

type Props = Readonly<{
	isOpen: boolean;
	close: () => void;
}>;

const AppDrawerComponent: FC<Props> = props => {
	const match = useLocation();
	const navigation = useNavigation();
	const { user, isUserLoading, userError } = useUserState();

	if (user === null) {
		return null;
	}
	return (
		<Drawer open={props.isOpen}
			className={styles.drawer}
			onClose={props.close}
		>
			<div className={styles['drawer__user-section']}>
				<Avatar alt={`${user.firstName} avatar`} src={user.avatarUrl} />
				<Typography variant="h4">{user.firstName} {user.lastName}</Typography>
				<Link component={NavLink} to="/profile">Go to profile</Link>
				<CloseIcon className={styles.drawer__close} onClick={props.close} />
			</div>

			<div className={styles.drawer__navigation}>
				<List>
					{navigationList.map(navigationItem => (
						<ListItem key={navigationItem.name} disablePadding>
							<ListItemButton component={NavLink} to={navigationItem.link}>
								<ListItemText primary={navigationItem.name} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</div>
		</Drawer>
	);
};

export const AppDrawer = memo(AppDrawerComponent);
