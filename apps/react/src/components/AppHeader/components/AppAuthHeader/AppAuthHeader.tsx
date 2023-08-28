import { FC, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import { User } from '@js-camp/core/models/user/user';
import { AppDrawer } from '@js-camp/react/components/AppDrawer';
import { typedMemo } from '@js-camp/react/utils/typedMemo';

import styles from './AppAuthHeader.module.css';

type Props = Readonly<{

	/** Current user. */
	user: User;
}>;

/**
 * App auth header component.
 * @param props Component props.
 */
const AppAuthHeaderComponent: FC<Props> = props => {

	/** Drawer is open. */
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const location = useLocation();

	const navigate = useNavigate();

	const isNotMainPage = location.pathname !== '/';

	const goToMainPage = (): void => {
		navigate('/');
	};

	return (
		<AppBar>
			<Toolbar className={styles['app-auth-header']}>
				<div className={styles['app-auth-header__menu-trigger']} onClick={() => setIsDrawerOpen(true)}>
					<Avatar alt={`${props.user.firstName} avatar`} src={props.user.avatarUrl} />
					<Typography variant="body1">Hi, {props.user.firstName}</Typography>
				</div>

				{isNotMainPage &&
					<Button color="white" onClick={goToMainPage} startIcon={<ArrowBackIosIcon />}>
						Main page
					</Button>}

				<AppDrawer isOpen={isDrawerOpen} close={() => setIsDrawerOpen(false)} />
			</Toolbar>
		</AppBar>
	);
};

export const AppAuthHeader = typedMemo(AppAuthHeaderComponent);
