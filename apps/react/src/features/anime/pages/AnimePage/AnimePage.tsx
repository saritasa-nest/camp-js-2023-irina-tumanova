import { memo, useEffect, FC, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';

import { fetchAnime } from '@js-camp/react/store/anime/dispatchers';
import { useAppDispatch } from '@js-camp/react/store';
import { AnimeFilterParams, AnimeParams } from '@js-camp/core/models/anime/anime-params';
import { AnimeSortingField, ReadableAnimeSortField } from '@js-camp/core/models/anime/anime-sort';
import { PaginationParams } from '@js-camp/core/models/pagination-params';
import { SortDirection, Sorting } from '@js-camp/core/models/sorting';
import { MultipleSort } from '@js-camp/react/components/MultipleSort/MultipleSort';
import { clearAnimeList } from '@js-camp/react/store/anime/slice';
import { AnimeType } from '@js-camp/core/models/anime/anime-type';
import { MultipleSelect } from '@js-camp/react/components/MultipleSelect';

import styles from './AnimePage.module.css';

/** Form values. */
interface FormValues {

	/** Genre types. */
	readonly types: AnimeType[];

	/** Search. */
	readonly search: string;

	/** Anime sorting field. */
	readonly sorting: readonly Sorting<AnimeSortingField>[];
}

const defaultPageSortFields: readonly Sorting<AnimeSortingField>[] = [
	{ field: AnimeSortingField.TitleEnglish, direction: SortDirection.None },
	{ field: AnimeSortingField.Status, direction: SortDirection.None },
];

const defaultParams: AnimeParams = {
	pagination: new PaginationParams({ pageSize: 30, pageNumber: 0 }),
	sorting: defaultPageSortFields,
	filters: new AnimeFilterParams({ types: [], search: '' }),
};

const defaultFormValues: FormValues = {
	types: [],
	search: '',
	sorting: defaultPageSortFields,
};

/** Anime page component. */
const AnimePageComponent: FC = () => {
	const dispatch = useAppDispatch();
	const [parameters, setParameters] = useState<AnimeParams>(defaultParams);

	useEffect(() => {
		dispatch(fetchAnime(parameters));
	}, [parameters]);

	const { register, handleSubmit, control } = useForm<FormValues>({
		defaultValues: defaultFormValues,
	});

	const onSubmit = (data: FormValues) => {
		dispatch(clearAnimeList());
		setParameters({
			...defaultParams,
			sorting: data.sorting,
		});
	};

	return (
		<aside className={styles.aside}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<MultipleSelect name={'types'} control={control} items={AnimeType.toArray()} title={'Filter'} />
				<MultipleSort
					name='sorting'
					title='Sorting'
					control={control}
					toReadable={ReadableAnimeSortField.toReadable}
				/>
				<TextField label="Search" {...register('search')} />
				<Button type="submit">Submit</Button>
			</form>
		</aside>
	);
};

export const AnimePage = memo(AnimePageComponent);
