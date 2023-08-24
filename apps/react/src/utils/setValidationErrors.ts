import { FieldPath, FieldValues, UseFormSetError } from 'react-hook-form';

import { AppValidationError } from '@js-camp/core/models/app-error';

/**
 * Sets validation errors.
 * @param error App error.
 * @param setError Function that sets errors in some form.
 */
export const setValidationErrors = <T extends FieldValues = FieldValues>(
	error: AppValidationError<T> | undefined,
	setError: UseFormSetError<T>,
) => {
	if (error === undefined) {
		return;
	}

	Object.keys(error.errors).forEach(key => {
		if (key in error.errors) {
			const message = error.errors[key];
			if (message !== undefined) {
				setError(key as `root.${string}` | 'root' | FieldPath<T>, { message });
			}
		}
	});
};
