import { useId } from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import { Button, FormControl, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import { typedMemo } from '@js-camp/react/utils/typedMemo';

import { FormControlProps } from '../../utils/formControl';
import styles from './MultipleSort.module.css';

/**  Sort props. */
type Props<T, R extends FieldValues> = {

	/** Title. */
	readonly title: string;

	/** Makes items readable for users. */
	readonly toReadable?: (value: T) => string;
} & FormControlProps<R>;

const MultipleSortComponent = <T extends string, R extends FieldValues>({
	control,
	name,
	title,
	toReadable,
}: Props<T, R>) => {
	const id = useId();

	/**
	 * Return new value array with toggled direction.
	 * @param value Value.
	 * @param index Index of sort field.
	 */
	function getNewValueWithToggledDirection<TValue extends FieldValues>(value: TValue, index: number) {
		const newValueArray = { ...value };
		if (value[index].direction === 'asc') {
			newValueArray[index].direction = 'desc';
		} else if (value[index].direction === 'desc') {
			newValueArray[index].direction = '';
		} else if (value[index].direction === '') {
			newValueArray[index].direction = 'asc';
		}
		return newValueArray;
	}

	return (
		<FormControl className={styles.formControl}>
			<Typography color="gray">{title}</Typography>
			<Controller
				control={control}
				name={name}
				render={({ field: { value, onChange, ...rest } }) =>
					value.map((sortField: R, index: number) => (
						<Button
							key={index}
							id={id}
							{...rest}
							startIcon={
								sortField.direction === 'asc' || sortField.direction === '' ? (
									<ArrowUpwardIcon />
								) : (
									<ArrowDownwardIcon />
								)
							}
							variant="contained"
							className={sortField.direction === '' ? styles.disabledButton : ''}
							color={sortField.direction === '' ? 'inherit' : 'primary'}
							onClick={() => onChange(getNewValueWithToggledDirection(value, index))}
						>
							{toReadable ? toReadable(value[index].field) : value[index].field}
						</Button>
					))
				}
			/>
		</FormControl>
	);
};

export const MultipleSort = typedMemo(MultipleSortComponent);
