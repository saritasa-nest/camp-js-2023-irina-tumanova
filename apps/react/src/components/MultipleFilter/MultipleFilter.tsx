import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { UseFormRegisterReturn } from 'react-hook-form';
import { InputLabel } from '@mui/material';

/**  Multiple filter props. */
interface Props<T> {
	/** Option items in select. */
	readonly items: readonly T[];

	/** Title. */
	readonly title: string;

	/**
	 * Return type of react hook form register function with needed conrol name - always the same.
	 * @example registerReturn-{register('type')}
	 */
	readonly registerReturn: UseFormRegisterReturn<'types'>;
}

// Arrow react functiol components can takes generic parameter only this way.
// eslint-disable-next-line @typescript-eslint/comma-dangle
const MultipleFilterComponent = <T extends string>(props: Props<T>) => {
	const [filteredItems, setFilteredItems] = useState<T[]>([]);

	const handleChange = (event: SelectChangeEvent<T[]>) => {
		const {
			target: { value },
		} = event;
		setFilteredItems(typeof value === 'string' ? (value.split(',') as T[]) : value);
	};

	return (
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
	);
};

export const MultipleFilter = React.memo(MultipleFilterComponent);
