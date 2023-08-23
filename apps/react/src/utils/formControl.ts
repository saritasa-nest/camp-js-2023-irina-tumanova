import { Control, FieldPath, FieldValues } from 'react-hook-form';

/** From control props. */
export interface FormControlProps<T extends FieldValues = FieldValues> {

	/** Any control. */
	readonly control: Control<T, any> /* eslint-disable-line @typescript-eslint/no-explicit-any */;

	/** Field name. */
	readonly name: FieldPath<T>;
}
