import { memo, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FieldError, FieldErrorsImpl, UseFormRegister, Merge, FieldValues, Path } from 'react-hook-form';
import { FormHelperText } from '@mui/material';

interface Props<TFieldValues extends FieldValues> {

	/** Field name. */
	readonly name: Path<TFieldValues>;

	/** Field label. */
	readonly label: string;

	/** Register input. */
	readonly register: UseFormRegister<TFieldValues>;

	/** Autocomplete. */
	readonly autocomplete: 'current-password' | 'new-password';

	/** Field error. */
	readonly error?: FieldError | Merge<FieldError, FieldErrorsImpl>;
}

const PasswordFieldComponent = <TFieldValues extends FieldValues>(props: Props<TFieldValues>) => {
	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = () => {
		setShowPassword(true);
	};

	const handleMouseDownPassword = () => {
		setShowPassword(false);
	};

	return (
		<FormControl variant="outlined" error={props.error !== undefined}>
			<InputLabel htmlFor="outlined-adornment-password">{props.label}</InputLabel>
			<OutlinedInput
				{...props.register(props.name, { required: true })}
				autoComplete={props.autocomplete}
				id={props.name}
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
				label={props.label}
			/>
			<FormHelperText id="component-error-text">{props.error?.message as string}</FormHelperText>
		</FormControl>
	);
};

export const PasswordField = memo(PasswordFieldComponent);