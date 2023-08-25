import { FC, memo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, TextField, Typography, Link } from '@mui/material';
import { NavLink } from 'react-router-dom';

import { AuthDispatcher } from '@js-camp/react/store/auth/dispatchers';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { selectAuthError, selectIsAuthLoading } from '@js-camp/react/store/auth/selectors';
import { AppValidationError } from '@js-camp/core/models/app-error';
import { Registration, RegistrationForm, RegistrationValidationErrors } from '@js-camp/core/models/auth/registration';
import { AppShadowLoader } from '@js-camp/react/components/AppShadowLoader';
import { setValidationErrors } from '@js-camp/react/utils/setValidationErrors';
import { reset } from '@js-camp/react/store/auth/slice';

import styles from '../common.module.css';
import { PasswordField } from '../../components/PasswordField';
import { validationSchema } from './RegistrationPage.settings';

const defaultRegistrationValues: RegistrationForm = {
	email: '',
	firstName: '',
	lastName: '',
	password: '',
	repeatedPassword: '',
};

/** Registration page component. */
const RegistrationPageComponent: FC = () => {
	/** Auth is loading. */
	const isLoading = useAppSelector(selectIsAuthLoading);

	/** Auth error. */
	const error: AppValidationError<RegistrationValidationErrors> | undefined = useAppSelector(selectAuthError);

	const dispatch = useAppDispatch();

	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
		control,
	} = useForm({ defaultValues: defaultRegistrationValues, resolver: zodResolver(validationSchema) });

	useEffect(() => {
		setValidationErrors(error, setError);
	}, [error]);

	/**
	 * On submit form.
	 * @param credentials Registration credentials.
	 */
	const onSubmit = (credentials: Registration) => {
		dispatch(AuthDispatcher.register(credentials));
	};

	/** Reset auth. */
	const resetAuth = () => {
		dispatch(reset());
	};

	return (
		<div className={styles.auth}>
			{isLoading && <AppShadowLoader />}

			<form className={styles['auth-form']} onSubmit={handleSubmit(onSubmit)}>
				<Typography variant="h2" className={styles['auth-form__title']}>
					Sign up
				</Typography>
				<TextField
					id="email"
					required
					autoComplete="email"
					error={errors.email !== undefined}
					helperText={errors.email?.message ?? ''}
					label="Email"
					variant="outlined"
					{...register('email')}
				/>

				<TextField
					id="firstName"
					required
					autoComplete="given-name"
					error={errors.firstName !== undefined}
					helperText={errors.firstName?.message as string}
					label="First name"
					variant="outlined"
					{...register('firstName')}
				/>

				<TextField
					id="lastName"
					required
					autoComplete="family-name"
					error={errors.lastName !== undefined}
					helperText={errors.lastName?.message ?? ''}
					label="Last name"
					variant="outlined"
					{...register('lastName')}
				/>

				<PasswordField
					name="password"
					label="Password"
					control={control}
					autocomplete="new-password"
					error={errors.password}
				/>

				<PasswordField
					name="repeatedPassword"
					label="Repeated password"
					control={control}
					autocomplete="new-password"
					error={errors.repeatedPassword}
				/>

				<Button variant="contained" className={styles['auth-form__submit']} type="submit">
					Submit
				</Button>
				<Link component={NavLink}
					to="/auth/login"
					className={styles['auth-form__auth-change']}
					onClick={resetAuth}>
					Sign in
				</Link>
			</form>
		</div>
	);
};

export const RegistrationPage = memo(RegistrationPageComponent);
