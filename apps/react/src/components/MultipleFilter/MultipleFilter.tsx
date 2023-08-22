import { useId } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Controller, FieldValues } from 'react-hook-form';
import { InputLabel } from '@mui/material';

import { typedMemo } from '@js-camp/react/utils/typedMemo';

import { FormControlProps } from '../../utils/formControl';

/**  Multiple filter props. */
type Props<T, R extends FieldValues> = {

	/** Option items in select. */
	readonly items: readonly T[];

	/** Title. */
	readonly title: string;
} & FormControlProps<R>;

// Arrow react functiol components can takes generic parameter only this way.
// eslint-disable-next-line @typescript-eslint/comma-dangle
const MultipleFilterComponent = <T extends string, R extends FieldValues>({
	items,
	title,
	control,
	name,
}: Props<T, R>) => {
	const id = useId();

	return (
		<FormControl sx={{ m: 1, width: 300 }}>
			<InputLabel>{title}</InputLabel>
			<Controller
				control={control}
				name={name}
				rules={{ required: true }}
				render={({ field: { onChange, ...rest } }) => (
					<Select {...rest} id={id} multiple onChange={onChange}>
						{items.map((itemName, index) => (
							<MenuItem key={index} value={itemName}>
								{itemName}
							</MenuItem>
						))}
					</Select>
				)}
			/>
		</FormControl>
	);
};

export const MultipleFilter = typedMemo(MultipleFilterComponent);
