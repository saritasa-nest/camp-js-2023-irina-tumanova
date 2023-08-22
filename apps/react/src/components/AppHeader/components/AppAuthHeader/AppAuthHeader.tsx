import { FC, memo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import styles from "./AppAuthHeader.module.css";
import { User } from "@js-camp/core/models/user/user";
import { AppDrawer } from "@js-camp/react/components/AppDrawer";

type Props = Readonly<{

	/** Current user. */
	user: User;
}>

/** App auth header component. */
const AppAuthHeaderComponent: FC<Props> = props => {

	/** Drawer is open. */
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const location = useLocation();

	const navigate = useNavigate();

	const goToMainPage = (): void => {
		navigate('/');
	}

	const checkIsNotMainPage = (): boolean => {
		return location.pathname !== '/';
	}

	return (
		<AppBar>
			<Toolbar className={styles['app-auth-header']}>
				<div className={styles['app-auth-header__menu-trigger']} onClick={() => setIsDrawerOpen(true)}>
					<Avatar alt={`${props.user.firstName} avatar`} src={props.user.avatarUrl} />
					<Typography variant="body1">Hi, {props.user.firstName}</Typography>
				</div>

				{checkIsNotMainPage() && 
					<Button color="white" onClick={goToMainPage} startIcon={<ArrowBackIosIcon />}>
						Main page
					</Button>}

				<AppDrawer isOpen={isDrawerOpen} close={() => setIsDrawerOpen(false)} />
			</Toolbar>
		</AppBar>
	)
}

export const AppAuthHeader = memo(AppAuthHeaderComponent);
