import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { selectAuthError, selectIsAuthLoading } from '@js-camp/react/store/auth/selectors';
import { FC, memo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthDispatcher } from '@js-camp/react/store/auth/dispatchers';
import { Button, TextField, Typography, Link } from '@mui/material';
import { NavLink } from 'react-router-dom';

import classes from '../common.module.css';
import { PasswordField } from '../../components/PasswordField';

import { validationSchema } from './RegistrationPage.settings';

/** Registration page component. */
const RegistrationPageComponent: FC = () => {
	const isLoading = useAppSelector(selectIsAuthLoading);
	const error = useAppSelector(selectAuthError);
	const dispatch = useAppDispatch();

	const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(validationSchema) });

	const onSubmit = data => {
		dispatch(AuthDispatcher.register(data));
	};

	console.log(error);

	return (
		<div className={`${classes.auth}`}>
			<form className={`${classes['auth-form']}`} onSubmit={handleSubmit(onSubmit)}>
				<Typography variant='h2' className={`${classes['auth-form__title']}`}>Sign up</Typography>
				<TextField id="email"
					autoComplete='email'
					error={errors.email !== undefined}
					helperText={errors.email?.message as string}
					label="Email"
					variant="outlined"
					{...register('email', { required: true })}/>

				<TextField id="firstName"
					autoComplete='given-name'
					error={errors.firstName !== undefined}
					helperText={errors.firstName?.message as string}
					label="First name"
					variant="outlined"
					{...register('firstName', { required: true })}/>

				<TextField id="lastName"
					autoComplete='family-name'
					error={errors.lastName !== undefined}
					helperText={errors.lastName?.message as string}
					label="Email"
					variant="outlined"
					{...register('lastName', { required: true })}/>

				<PasswordField name='password'
					label='Password'
					register={register}
					autocomplete='new-password'
					error={errors.password}/>

				<PasswordField name='repeatedPassword'
					label='Repeated password'
					register={register}
					autocomplete='new-password'
					error={errors.repeatedPassword}/>

				<Button variant="contained" className={`${classes['auth-form__submit']}`} type="submit">Submit</Button>
				<Link component={NavLink} to='/auth/login' className={`${classes['auth-form__auth-change']}`}>
					Sign in
				</Link>
			</form>
		</div>
	);
};

export const RegistrationPage = memo(RegistrationPageComponent);
