import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { selectAuthError, selectIsAuthLoading } from '@js-camp/react/store/auth/selectors';
import { FC, memo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthDispatcher } from '@js-camp/react/store/auth/dispatchers';
import { Button, TextField, Typography, Link } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { AppValidationError } from '@js-camp/core/models/app-error';
import { Registration, RegistrationForm, RegistrationValidationErrors } from '@js-camp/core/models/auth/registration';
import { AppShadowLoader } from '@js-camp/react/components/AppShadowLoader/AppShadowLoader';

import classes from '../common.module.css';
import { PasswordField } from '../../components/PasswordField';

import { validationSchema } from './RegistrationPage.settings';

/** Registration page component. */
const RegistrationPageComponent: FC = () => {
	const isLoading = useAppSelector(selectIsAuthLoading);
	const error: AppValidationError<RegistrationValidationErrors> | undefined = useAppSelector(selectAuthError);
	const dispatch = useAppDispatch();

	const {
		register, handleSubmit,
		formState: { errors },
		setError,
	} = useForm<RegistrationForm>({ resolver: zodResolver(validationSchema) });

	const onSubmit = (data: Registration) => {
		dispatch(AuthDispatcher.register(data));
	};

	useEffect(() => {
		if (error === undefined) {
			return;
		}

		Object.keys(error.errors).map(key => {
			const message = error.errors[key as keyof Registration];
			if (message !== undefined) {
				setError(key as keyof Registration, { message });
			}
		});
	}, [error]);

	const reset = () => {
		dispatch(AuthDispatcher.reset);
	};

	return (
		<div className={`${classes.auth}`}>
			{isLoading && <AppShadowLoader />}

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
				<Link component={NavLink}
					to='/auth/login'
					className={`${classes['auth-form__auth-change']}`}
					onClick={reset}>
					Sign in
				</Link>
			</form>
		</div>
	);
};

export const RegistrationPage = memo(RegistrationPageComponent);
