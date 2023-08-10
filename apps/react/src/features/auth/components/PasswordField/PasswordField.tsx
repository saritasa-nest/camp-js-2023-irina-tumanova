import { FC, memo, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FieldValues, RegisterOptions, UseFormRegisterReturn } from 'react-hook-form';

interface Props {

	/** Register input. */
	readonly register: (name: 'password', options?: RegisterOptions<FieldValues, 'password'> | undefined) =>
	UseFormRegisterReturn<'password'>;

	/** Autocomplete. */
	readonly autocomplete: 'current-password' | 'new-password';
}

const PasswordFieldComponent: FC<Props> = props => {
	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = () => {
		setShowPassword(true);
	};

	const handleMouseDownPassword = () => {
		setShowPassword(false);
	};

	return (
		<FormControl variant="outlined">
			<InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
			<OutlinedInput
				{...props.register('password', { required: true })}
				autoComplete={props.autocomplete}
				id="outlined-adornment-password"
				type={showPassword ? 'text' : 'password'}
				endAdornment={
					<InputAdornment position="end">
						<IconButton
							aria-label="toggle password visibility"
							onClick={handleClickShowPassword}
							onMouseDown={handleMouseDownPassword}
							edge="end"
						>
							{showPassword ? <VisibilityOff /> : <Visibility />}
						</IconButton>
					</InputAdornment>
				}
				label="Password"
			/>
		</FormControl>
	);
};

export const PasswordField = memo(PasswordFieldComponent);
