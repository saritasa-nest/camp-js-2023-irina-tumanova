import { useId, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FormHelperText } from '@mui/material';
import { FieldError, FieldErrorsImpl, Merge, FieldValues, useController } from 'react-hook-form';

import { typedMemo } from '@js-camp/react/utils/typedMemo';
import { FormControlProps } from '@js-camp/react/utils/formControl';

type Props<TFieldValues extends FieldValues> = {

	/** Field label. */
	readonly label: string;

	/** Autocomplete. */
	readonly autocomplete: 'current-password' | 'new-password';

	/** Field error. */
	readonly error?: FieldError | Merge<FieldError, FieldErrorsImpl>;
} & FormControlProps<TFieldValues>;

/**
 * Password field component.
 * @param props Props.
 */
const PasswordFieldComponent = <T extends FieldValues>({ label, name, control, autocomplete, error }: Props<T>) => {
	/** Show password. */
	const [isVisiblePassword, setIsVisiblePassword] = useState(false);

	/** Password input id. */
	const passwordId = useId();

	const { field } = useController({ control, name });

	/** Toggle isVisible password. */
	const toggleDisplayPassword = () => {
		setIsVisiblePassword(isVisible => !isVisible);
	};

	return (
		<FormControl variant="outlined" error={error !== undefined}>
			<InputLabel htmlFor={passwordId} required>
				{label}
			</InputLabel>
			<OutlinedInput
				{...field}
				autoComplete={autocomplete}
				id={passwordId}
				type={isVisiblePassword ? 'text' : 'password'}
				endAdornment={
					<InputAdornment position="end">
						<IconButton aria-label="toggle password visibility" onClick={toggleDisplayPassword} edge="end">
							{isVisiblePassword ? <VisibilityOff /> : <Visibility />}
						</IconButton>
					</InputAdornment>
				}
				label={label}
			/>
			<FormHelperText id="component-error-text">{error?.message as string}</FormHelperText>
		</FormControl>
	);
};

export const PasswordField = typedMemo(PasswordFieldComponent);
