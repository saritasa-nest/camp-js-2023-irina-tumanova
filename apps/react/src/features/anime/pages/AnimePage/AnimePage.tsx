import { memo, useEffect, FC, useMemo, useState, useRef } from 'react';
import { Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';

import { fetchAnime } from '@js-camp/react/store/anime/dispatchers';
import { selectAnime } from '@js-camp/react/store/anime/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { AnimeFilterParams, AnimeParams } from '@js-camp/core/models/anime/anime-params';
import { AnimeSortingField, ReadableAnimeSortField } from '@js-camp/core/models/anime/anime-sort';
import { PaginationParams } from '@js-camp/core/models/pagination-params';
import { Sorting } from '@js-camp/core/models/sorting';
import { MultipleSort } from '@js-camp/react/components/MultipleSort/MultipleSort';
import { clearAnimeList } from '@js-camp/react/store/anime/slice';
import { AnimeType } from '@js-camp/core/models/anime/anime-type';
import { MultipleFilter } from '@js-camp/react/components/MultipleFilter/MultipleFilter';
import { InfinityScroll } from '@js-camp/react/components/InfinityScrollCards';

import { AnimeCard } from '../../components/AnimeCard';
import styles from './AnimePage.module.css';

/** Form values. */
interface FormValues {

	/** Genre types. */
	types: AnimeType[];

	/** Search. */
	search: string;

	/** Anime sorting field. */
	sorting: Sorting<AnimeSortingField>[];
}

const thisPageSortFields: Sorting<AnimeSortingField>[] = [
	{ field: AnimeSortingField.TitleEnglish, direction: '' },
	{ field: AnimeSortingField.Status, direction: '' },
];

const defaultParams: AnimeParams = {
	pagination: new PaginationParams({ pageSize: 30, pageNumber: 0 }),
	sorting: thisPageSortFields,
	filters: new AnimeFilterParams({ types: [], search: '' }),
};

const defaultFormValues: FormValues = {
	types: [],
	search: '',
	sorting: thisPageSortFields,
};

/** Anime page component. */
const AnimePageComponent: FC = () => {
	const dispatch = useAppDispatch();
	const animeList = useAppSelector(selectAnime);
	const [parameters, setParameters] = useState<AnimeParams>(defaultParams);

	const lastItemRef = useRef<HTMLLIElement | null>(null);

	const handleObserve = () => {
		setParameters(prevState => ({
			...prevState,
			pagination: { ...prevState.pagination, pageNumber: prevState.pagination.pageNumber + 1 },
		}));
	};

	useEffect(() => {
		dispatch(fetchAnime(parameters));
	}, [parameters]);

	const form = useForm<FormValues>({
		defaultValues: defaultFormValues,
	});

	const { register, handleSubmit, control } = form;

	const onSubmit = (data: FormValues) => {
		dispatch(clearAnimeList());
		setParameters({
			...defaultParams,
			sorting: data.sorting,
		});
	};

	/** Getting anime type array. */
	const typeItems = useMemo(() => Object.values(AnimeType).slice(0, -1), [AnimeType]) as AnimeType[];

	return (
		<aside className={styles.aside}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<MultipleFilter name={'types'} control={control} items={typeItems} title={'Filter'} />
				<MultipleSort
					name={'sorting'}
					control={control}
					title={'Sorting'}
					toReadable={ReadableAnimeSortField.toReadable}
				/>
				<TextField label="Search" {...register('search')} />
				<Button type="submit">Submit</Button>
			</form>
			<InfinityScroll lastItemRef={lastItemRef} handleObserve={handleObserve}>
				{animeList.map((anime, index) => (
					<AnimeCard ref={index === animeList.length - 1 ? lastItemRef : null} key={anime.id} anime={anime} />
				))}
			</InfinityScroll>
		</aside>
	);
};

export const AnimePage = memo(AnimePageComponent);
