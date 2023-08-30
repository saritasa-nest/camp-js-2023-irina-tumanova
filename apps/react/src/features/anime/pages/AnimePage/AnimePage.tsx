import { memo, FC, useState, useEffect, useReducer } from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { AnimeParams, AnimeFilterParams } from '@js-camp/core/models/anime/anime-params';
import { AnimeSortingField } from '@js-camp/core/models/anime/anime-sort';
import { PaginationParams } from '@js-camp/core/models/pagination-params';
import { Sorting } from '@js-camp/core/models/sorting';
import { useAppDispatch } from '@js-camp/react/store';
import { fetchAnime } from '@js-camp/react/store/anime/dispatchers';
import { clearAnimeListState } from '@js-camp/react/store/anime/slice';
import { AnimeType } from '@js-camp/core/models/anime/anime-type';
import { ListFilterForm } from '@js-camp/core/models/list-filter-form';
import { paramsReducer } from '@js-camp/react/utils/parametersReducer';

import styles from './AnimePage.module.css';
import { AnimeDrawer } from '../../components/AnimeDrawer';
import { AnimeAsideList } from '../../components/AnimeAsideList';

const defaultPageSortFields: readonly Sorting<AnimeSortingField>[] = [
	{ field: AnimeSortingField.TitleEnglish, direction: '' },
	{ field: AnimeSortingField.Status, direction: '' },
];

const defaultParams: AnimeParams = {
	pagination: new PaginationParams({ pageSize: 15, pageNumber: 0 }),
	sorting: defaultPageSortFields,
	filters: new AnimeFilterParams({ types: [], search: '' }),
};

const defaultFormValues: ListFilterForm<AnimeType, AnimeSortingField> = {
	types: [],
	search: '',
	sorting: defaultPageSortFields,
};

/** Anime page component. */
const AnimePageComponent: FC = () => {
	const dispatch = useAppDispatch();
	const [params, paramsDispatch] = useReducer(paramsReducer<AnimeSortingField, AnimeFilterParams>, defaultParams);

	useEffect(() => {
		dispatch(clearAnimeListState());
	}, []);

	useEffect(() => {
		dispatch(fetchAnime(params as AnimeParams));
	}, [params]);

	const [isMenuOpened, setIsMenuOpened] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpened(prevState => !prevState);
	};

	return (
		<Box className={styles.pageWrapper}>
			<AnimeDrawer
				paramsDispatch={paramsDispatch}
				toggleMenu={toggleMenu}
				isOpened={isMenuOpened}
				defaultFormValues={defaultFormValues}
				defaultParams={defaultParams}
			/>
			<AnimeAsideList
				paramsDispatch={paramsDispatch}
				toggleMenu={toggleMenu}
			/>
			<Outlet />
		</Box>
	);
};

export const AnimePage = memo(AnimePageComponent);
