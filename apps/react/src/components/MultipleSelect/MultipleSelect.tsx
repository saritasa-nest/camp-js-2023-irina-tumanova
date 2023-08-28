import { useId } from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import { InputLabel, FormControl, Select, MenuItem } from '@mui/material';

import { typedMemo } from '@js-camp/react/utils/typedMemo';

import { FormControlProps } from '../../utils/formControl';

/**  Multiple filter props. */
type Props<T, R extends FieldValues> = {

	/** Option items in select. */
	readonly items: readonly T[];

	/** Title. */
	readonly title: string;

	/** Makes items readable fors users. */
	readonly toReadable?: (value: T) => string;
} & FormControlProps<R>;

/** Multiple select. */
const MultipleSelectComponent = <T extends string, R extends FieldValues>({
	items,
	title,
	control,
	name,
	toReadable,
}: Props<T, R>) => {
	const id = useId();

	return (
		<FormControl>
			<InputLabel>{title}</InputLabel>
			<Controller
				control={control}
				name={name}
				render={({ field: { onChange, ...rest } }) => (
					<Select label={title} {...rest} id={id} multiple onChange={onChange}>
						{items.map(itemName => (
							<MenuItem key={itemName} value={itemName}>
								{toReadable ? toReadable(itemName) : itemName}
							</MenuItem>
						))}
					</Select>
				)}
			/>
		</FormControl>
	);
};

export const MultipleSelect = typedMemo(MultipleSelectComponent);
