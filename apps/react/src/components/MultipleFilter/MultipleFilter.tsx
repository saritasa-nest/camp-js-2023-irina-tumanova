import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { UseFormRegisterReturn } from 'react-hook-form';
import { InputLabel } from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

interface Props<T> {
	readonly items: T[];

	readonly title: string;

	readonly registerReturn: UseFormRegisterReturn<'filter'>;
}

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
			<Select multiple {...props.registerReturn} value={filteredItems} onChange={handleChange} MenuProps={MenuProps}>
				{props.items.map((name) => (
					<MenuItem key={name} value={name}>
						{name}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export const MultipleFilter = React.memo(MultipleFilterComponent);
