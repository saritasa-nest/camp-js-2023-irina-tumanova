import { useId } from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import { Button } from '@mui/material';

import { typedMemo } from '@js-camp/react/utils/typedMemo';

import { FormControlProps } from '../../utils/formControl';

/**  Sort props. */
type Props<T, R extends FieldValues> = {

	/** Option items in select. */
	readonly item: T;

	/** Title. */
	readonly title: string;

	/** Sort field index. */
	readonly index: number;
} & FormControlProps<R>;

// Arrow react functiol components can takes generic parameter only this way.
// eslint-disable-next-line @typescript-eslint/comma-dangle
const MultipleSortComponent = <T extends string, R extends FieldValues>({
	item,
	control,
	name,
	index,
}: Props<T, R>) => {
	const id = useId();

	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { value, onBlur, onChange, ref } }) => (
				<Button
					onBlur={onBlur}
					ref={ref}
					color="primary"
					sx={{ m: 1, width: 300 }}
					onClick={() => onChange(value[index].direction === 'asc' ? 'desc' : 'asc')}
				>
					{value === 'asc' ? '⬆️' : '⬇️'}
					{item}
				</Button>
			)}
		/>
	);
};

export const MultipleSort = typedMemo(MultipleSortComponent);
