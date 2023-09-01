import { useId } from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import { Button, FormControl, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import { typedMemo } from '@js-camp/react/utils/typedMemo';
import { SortDirection, Sorting } from '@js-camp/core/models/sorting';

import { FormControlProps } from '../../utils/formControl';
import styles from './MultipleSort.module.css';

/**  Sort props. */
type Props<T, R extends FieldValues> = {

	/** Title. */
	readonly title: string;

	/** Makes items readable for users. */
	readonly toReadable?: (value: T) => string;
} & FormControlProps<R>;

const directionToggleObject = {
	[SortDirection.Asc]: SortDirection.Desc,
	[SortDirection.Desc]: SortDirection.None,
	[SortDirection.None]: SortDirection.Asc,
};

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
	function getNewValueWithToggledDirection<TValue extends Sorting<FieldValues>>(
		value: readonly TValue[],
		index: number,
	): TValue[] {
		const elementForChange = value.at(index);
		const newArr = [...value];

		if (elementForChange == null) {
			return newArr;
		}

		newArr[index] = {
			...elementForChange,
			direction: directionToggleObject[elementForChange.direction],
		};

		return newArr;
	}

	return (
		<FormControl className={styles.formControl}>
			<Typography className={styles.sortTitle}>{title}</Typography>
			<Controller
				control={control}
				name={name}
				render={({ field: { value, onChange, ...rest } }) =>
					value.map((sortField: R, index: number) => (
						<Button
							key={`${value[index].field}`}
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
