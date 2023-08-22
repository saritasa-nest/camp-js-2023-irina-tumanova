import { memo, useEffect, FC, useMemo, useState } from 'react';
import { fetchAnime } from '@js-camp/react/store/anime/dispatchers';
import { selectAnime, selectIsAnimeLoading } from '@js-camp/react/store/anime/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { AnimeFilterParams, AnimeParams, AnimeSortingField } from '@js-camp/core/models/anime/anime-params';
import { PaginationParams } from '@js-camp/core/models/pagination-params';
import { Sorting } from '@js-camp/core/models/sorting';
import { MultipleSort } from '@js-camp/react/components/MultipleSort/MultipleSort';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { clearAnimeList } from '@js-camp/react/store/anime/slice';
import { AnimeType } from '@js-camp/core/models/anime/anime-type';

import { AnimeCard } from '../../components/AnimeCard';

import styles from './AnimePage.module.css';

const defaultParams: AnimeParams = {
	pagination: new PaginationParams({ pageSize: 5, pageNumber: 0 }),
	sorting: new Sorting({ field: AnimeSortingField.None, direction: 'asc' }),
	filters: new AnimeFilterParams({ types: [], search: '' }),
};

/** Form values. */
interface FormValues {

	/** Anime sorted fields. */
	sorting: Sorting<AnimeSortingField>;
}

/** Anime page component. */
const AnimePageComponent: FC = () => {
	const dispatch = useAppDispatch();
	const animeList = useAppSelector(selectAnime);
	const isLoading = useAppSelector(selectIsAnimeLoading);
	const [parameters, setParameters] = useState<AnimeParams>(defaultParams);

	useEffect(() => {
		dispatch(fetchAnime(parameters));
	}, [parameters]);

	const form = useForm<FormValues>({
		defaultValues: {
			sorting: defaultParams.sorting,
		},
	});

	const { control, handleSubmit } = form;

	const onSubmit = (data: FormValues) => {
		dispatch(clearAnimeList());
		setParameters({
			...defaultParams,
			sorting: { field: data.sorting.field, direction: data.sorting.direction },
		});
	};

	if (isLoading) {
		return <div>Loading</div>;
	}

	/** Getting genre type array. */
	const items = useMemo(() => Object.values(AnimeType).slice(0, -1), [AnimeType]) as AnimeType[];

	return (
		<aside className={styles.aside}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<MultipleSort name={'sorting'} control={control} items={items} title={'Sorting'} />
				<Button type="submit">Submit</Button>
			</form>
			<h1>Anime</h1>
			{animeList.map(anime => <AnimeCard key={anime.id} anime={anime} />)}
		</aside>
	);
};

export const AnimePage = memo(AnimePageComponent);
