import { Box, Button, Link, TextField, Typography } from '@mui/material';
import { FC, memo } from 'react';
import { NavLink } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { selectIsAuthLoading } from '@js-camp/react/store/auth/selectors';

import classes from '../common.module.css';

/** Login page component. */
const LoginPageComponent: FC = () => {
	const loading = useAppSelector(selectIsAuthLoading);
	const dispatch = useAppDispatch();

	return (
		<div className={`${classes.auth}`}>
			<Box className={`${classes['auth-form']}`}>
				<Typography variant='h2' className={`${classes['auth-form__title']}`}>Sign in</Typography>
				<TextField id="outlined-basic" label="Email" variant="outlined" />
				<TextField id="outlined-basic" label="Password" variant="outlined" />
				<Button variant="contained" className={`${classes['auth-form__submit']}`}>Submit</Button>
				<Link component={NavLink} to='/auth/registration' className={`${classes['auth-form__auth-change']}`}>Sign up</Link>
			</Box>
		</div>
	);
};

export const LoginPage = memo(LoginPageComponent);
