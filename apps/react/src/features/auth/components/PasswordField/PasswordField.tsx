import { memo, useId, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FormHelperText } from '@mui/material';
import { FieldError, FieldErrorsImpl, UseFormRegister, Merge, FieldValues, Path } from 'react-hook-form';

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

/**
 * Password field component.
 * @param props Props.
 */
const PasswordFieldComponent = <TFieldValues extends FieldValues>(props: Props<TFieldValues>) => {

	/** Show password. */
	const [isVisiblePassword, setIsVisiblePassword] = useState(false);

	/** Password input id. */
	const passwordId = useId();

	/** Show password. */
	const showPassword = () => {
		setIsVisiblePassword(true);
	};

	/** Hide password. */
	const hidePassword = () => {
		setIsVisiblePassword(false);
	};

	return (
		<FormControl variant="outlined" error={props.error !== undefined}>
			<InputLabel htmlFor={passwordId} required>{props.label}</InputLabel>
			<OutlinedInput
				{...props.register(props.name)}
				autoComplete={props.autocomplete}
				id={passwordId}
				type={isVisiblePassword ? 'text' : 'password'}
				endAdornment={
					<InputAdornment position="end">
						<IconButton
							aria-label="toggle password visibility"
							onClick={showPassword}
							onMouseDown={hidePassword}
							edge="end"
						>
							{isVisiblePassword ? <VisibilityOff /> : <Visibility />}
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
