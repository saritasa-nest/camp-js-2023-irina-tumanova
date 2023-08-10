import { Box, Button, Link, TextField, Typography } from '@mui/material';
import { FC, memo } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { selectIsAuthLoading } from '@js-camp/react/store/auth/selectors';
import { useForm } from 'react-hook-form';

import classes from '../common.module.css';
import { PasswordField } from '../../components/PasswordField';

/** Login page component. */
const LoginPageComponent: FC = () => {
	const loading = useAppSelector(selectIsAuthLoading);
	const dispatch = useAppDispatch();

	const { register, handleSubmit, formState: { errors } } = useForm();

	const onSubmit = data => {
		console.log(data, errors);
	};

	console.log(errors);

	return (
		<div className={`${classes.auth}`}>
			<form className={`${classes['auth-form']}`} onSubmit={handleSubmit(onSubmit)}>
				<Typography variant='h2' className={`${classes['auth-form__title']}`}>Sign in</Typography>
				<TextField id="outlined-basic"
					autoComplete='email'
					error={errors.email !== undefined}
					helperText={errors.email?.message}
					label="Email"
					variant="outlined"
					{...register('email', { required: true })}/>
				<PasswordField register={register} autocomplete='current-password'/>
				<Button variant="contained" className={`${classes['auth-form__submit']}`} type="submit">Submit</Button>
				<Link component={NavLink} to='/auth/registration' className={`${classes['auth-form__auth-change']}`}>
					Sign up
				</Link>
			</form>
		</div>
	);
};

export const LoginPage = memo(LoginPageComponent);
