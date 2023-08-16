import { memo, useEffect, FC } from 'react';
import { fetchAnime } from '@js-camp/react/store/anime/dispatchers';
import { selectAnime, selectIsAnimeLoading } from '@js-camp/react/store/anime/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { AnimeFilterParams, AnimeParams, AnimeSortingField } from '@js-camp/core/models/anime/anime-params';
import { PaginationParams } from '@js-camp/core/models/pagination-params';
import { Sorting } from '@js-camp/core/models/sorting';

import { AnimeCard } from '../../components/AnimeCard';

/** Anime page component. */
const AnimePageComponent: FC = () => {
	const dispatch = useAppDispatch();
	const animeList = useAppSelector(selectAnime);
	const isLoading = useAppSelector(selectIsAnimeLoading);

	const defaultParams: AnimeParams = {
		pagination: new PaginationParams({ pageSize: 10, pageNumber: 0 }),
		sorting: new Sorting({ field: AnimeSortingField.None, direction: 'asc' }),
		filters: new AnimeFilterParams({ types: [], search: '' }),
	};

	useEffect(() => {
		dispatch(fetchAnime(defaultParams));
	}, [dispatch]);

	if (isLoading) {
		return <div>Loading</div>;
	}

	return (
		<>
			<h1>Anime</h1>
			{animeList.map(anime => <AnimeCard key={anime.id} anime={anime} />)}
		</>
	);
};

export const AnimePage = memo(AnimePageComponent);
