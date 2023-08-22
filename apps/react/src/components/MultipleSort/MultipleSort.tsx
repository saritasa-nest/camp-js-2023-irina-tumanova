import React, { useId } from 'react';
import FormControl from '@mui/material/FormControl';
import { Controller, FieldValues } from 'react-hook-form';
import { Button, InputLabel } from '@mui/material';

import { FormControlProps } from '../../utils/'

/**  Multiple filter props. */
type Props<T, R extends FieldValues> = {

	/** Option items in select. */
	readonly items: readonly T[];

	/** Title. */
	readonly title: string;
} & FormControlProps<R>;

// Arrow react functiol components can takes generic parameter only this way.
// eslint-disable-next-line @typescript-eslint/comma-dangle
const MultipleSortComponent = <T extends string, R extends FieldValues>({
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
				render={({ field: { value, onBlur, onChange, ref } }) => (
					<Button
						onBlur={onBlur}
						ref={ref}
						color='secondary'
						sx={{ m: 1, width: 300 }}
						onClick={() => onChange(value === 'asc' ? 'desc' : 'asc')}
					>
						{value === 'asc' ? '⬆️' : '⬇️'}{items}
					</Button>
				)}
			/>
		</FormControl>
	);
};

export const MultipleSort = React.memo(MultipleSortComponent);

/*
		<FormControl sx={{ m: 1, width: 300 }}>
			<InputLabel>{props.title}</InputLabel>
			<Select multiple {...props.registerReturn} value={filteredItems} onChange={handleChange}>
				{props.items.map((name, index) => (
					<MenuItem key={index} value={name}>
						{name}
					</MenuItem>
				))}
			</Select>
		</FormControl>
*/
