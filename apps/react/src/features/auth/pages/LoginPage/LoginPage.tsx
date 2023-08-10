import { Button, Link, TextField, Typography } from '@mui/material';
import { FC, memo } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { selectAuthError, selectIsAuthLoading } from '@js-camp/react/store/auth/selectors';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { AuthDispatcher } from '@js-camp/react/store/auth/dispatchers';

import classes from '../common.module.css';
import { PasswordField } from '../../components/PasswordField';

import { validationSchema } from './LoginPage.settings';

/** Login page component. */
const LoginPageComponent: FC = () => {
	const isLoading = useAppSelector(selectIsAuthLoading);
	const error = useAppSelector(selectAuthError);
	const dispatch = useAppDispatch();

	const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(validationSchema) });

	const onSubmit = data => {
		console.log(data, errors);

		dispatch(AuthDispatcher.login(data));
	};

	return (
		<div className={`${classes.auth}`}>
			<form className={`${classes['auth-form']}`} onSubmit={handleSubmit(onSubmit)}>
				<Typography variant='h2' className={`${classes['auth-form__title']}`}>Sign in</Typography>
				<TextField id="email"
					autoComplete='email'
					error={errors.email !== undefined}
					helperText={errors.email?.message as string}
					label="Email"
					variant="outlined"
					{...register('email', { required: true })}/>
				<PasswordField name='password'
					label='Password'
					register={register}
					autocomplete='current-password'
					error={errors.password}/>
				<Button variant="contained" className={`${classes['auth-form__submit']}`} type="submit">Submit</Button>
				<Link component={NavLink} to='/auth/registration' className={`${classes['auth-form__auth-change']}`}>
					Sign up
				</Link>
			</form>
		</div>
	);
};

export const LoginPage = memo(LoginPageComponent);
