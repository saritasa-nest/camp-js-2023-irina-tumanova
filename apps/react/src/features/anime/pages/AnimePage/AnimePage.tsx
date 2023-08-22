import { memo, useEffect, FC, useMemo, useState, useRef } from 'react';
import { Button, InputLabel, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';

import { fetchAnime } from '@js-camp/react/store/anime/dispatchers';
import { selectAnime } from '@js-camp/react/store/anime/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { AnimeFilterParams, AnimeParams, AnimeSortingField } from '@js-camp/core/models/anime/anime-params';
import { PaginationParams } from '@js-camp/core/models/pagination-params';
import { Sorting } from '@js-camp/core/models/sorting';
import { MultipleSort } from '@js-camp/react/components/MultipleSort/MultipleSort';
import { clearAnimeList } from '@js-camp/react/store/anime/slice';
import { AnimeType } from '@js-camp/core/models/anime/anime-type';
import { MultipleFilter } from '@js-camp/react/components/MultipleFilter/MultipleFilter';
import { InfinityScroll } from '@js-camp/react/components/InfinityScrollCards';

import { AnimeCard } from '../../components/AnimeCard';
import styles from './AnimePage.module.css';

const defaultParams: AnimeParams = {
	pagination: new PaginationParams({ pageSize: 15, pageNumber: 0 }),
	sorting: [new Sorting({ field: AnimeSortingField.None, direction: 'asc' })],
	filters: new AnimeFilterParams({ types: [], search: '' }),
};

/** Form values. */
interface FormValues {

	/** Genre types. */
	types: AnimeType[];

	/** Search. */
	search: string;

	/** Anime sorting field. */
	sorting: Sorting<AnimeSortingField>[];
}

const defaultFormValues: FormValues = {
	types: [],
	search: '',
	sorting: [{ field: AnimeSortingField.None, direction: 'asc' }],
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

	/** Getting genre type array. */
	const items = useMemo(() => Object.values(AnimeType).slice(0, -1), [AnimeType]) as AnimeType[];

	const sortedFields = ['Title English', 'Status'];

	return (
		<aside className={styles.aside}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<MultipleFilter name={'types'} control={control} items={items} title={'Filter'} />
				<InputLabel>Sorting</InputLabel>
				{
					sortedFields.map(
						(field, index) =>
							<MultipleSort
								key={index}
								index={index}
								name={'sorting'}
								control={control}
								item={field}
								title={'Sorting'}
							/>,
					)
				}
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
