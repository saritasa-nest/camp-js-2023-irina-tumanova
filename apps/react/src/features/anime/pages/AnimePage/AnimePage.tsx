import { memo, useEffect, FC, useState, useCallback, useReducer } from 'react';
import { Box, Button, Divider, Drawer, IconButton, TextField } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Outlet } from 'react-router-dom';

import { fetchAnime } from '@js-camp/react/store/anime/dispatchers';
import { selectAnime, selectIsAnimeLoading } from '@js-camp/react/store/anime/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { AnimeFilterParams, AnimeParams } from '@js-camp/core/models/anime/anime-params';
import { AnimeSortingField } from '@js-camp/core/models/anime/anime-sort';
import { PaginationParams } from '@js-camp/core/models/pagination-params';
import { Sorting } from '@js-camp/core/models/sorting';
import { MultipleSort } from '@js-camp/react/components/MultipleSort/MultipleSort';
import { clearAnimeList, clearAnimeListState } from '@js-camp/react/store/anime/slice';
import { AnimeType } from '@js-camp/core/models/anime/anime-type';
import { MultipleSelect } from '@js-camp/react/components/MultipleSelect';
import { AppShadowLoader } from '@js-camp/react/components/AppShadowLoader';
import { ParamsActionTypes, paramsReducer } from '@js-camp/react/utils/parametersReducer';
import { InfinityScroll } from '@js-camp/react/components/InfinityScroll';

import { AnimeCard } from '../../components/AnimeCard';
import styles from './AnimePage.module.css';

const defaultPageSortFields: readonly Sorting<AnimeSortingField>[] = [
	{ field: AnimeSortingField.TitleEnglish, direction: '' },
	{ field: AnimeSortingField.Status, direction: '' },
];

const defaultParams: AnimeParams = {
	pagination: new PaginationParams({ pageSize: 15, pageNumber: 0 }),
	sorting: defaultPageSortFields,
	filters: new AnimeFilterParams({ types: [], search: '' }),
};

/** Form values. */
interface FormValues {

	/** Anime types. */
	readonly types: AnimeType[];

	/** Search. */
	readonly search: string;

	/** Anime sorting field. */
	readonly sorting: readonly Sorting<AnimeSortingField>[];
}

const defaultFormValues: FormValues = {
	types: [],
	search: '',
	sorting: defaultPageSortFields,
};

/** Anime page component. */
const AnimePageComponent: FC = () => {
	const dispatch = useAppDispatch();
	const animeList = useAppSelector(selectAnime);
	const isLoading = useAppSelector(selectIsAnimeLoading);

	const [params, paramsDispatch] = useReducer(paramsReducer<AnimeSortingField, AnimeFilterParams>, defaultParams);

	const [isMenuOpened, setIsMenuOpened] = useState(false);

	const [lastItemNode, setLastItemNode] = useState<HTMLLIElement | null>(null);

	const getNextPaginationData = () => {
		paramsDispatch({ type: ParamsActionTypes.ChangePagination });
	};

	useEffect(() => {
		dispatch(clearAnimeListState());
	}, []);

	useEffect(() => {
		dispatch(fetchAnime(params as AnimeParams));
	}, [params]);

	const { register, handleSubmit, control } = useForm<FormValues>({
		defaultValues: defaultFormValues,
	});

	const toggleMenu = () => {
		setIsMenuOpened(prevState => !prevState);
	};

	const onSubmit: SubmitHandler<FormValues> = ({ types, search, sorting }) => {
		dispatch(clearAnimeList());
		paramsDispatch({
			type: ParamsActionTypes.ChangeFilterAndSorting,
			payload: {
				sorting,
				filter: new AnimeFilterParams({ types, search }),
				defaultPagination: defaultParams.pagination,
			},
		});
		toggleMenu();
	};

	const getLastAnimeNode = useCallback((node: HTMLLIElement) => {
		setLastItemNode(node);
	}, []);

	return (
		<Box className={styles.pageWrapper}>
			<Drawer open={isMenuOpened} onClose={toggleMenu}>
				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<TextField label="Search" {...register('search')} />
					<MultipleSelect
						name="types"
						toReadable={AnimeType.toReadable}
						control={control}
						items={AnimeType.toArray()}
						title="Filter"
					/>
					<MultipleSort name="sorting" control={control} title="Sorting" toReadable={AnimeSortingField.toReadable} />
					<Button type="submit">Apply</Button>
				</form>
			</Drawer>
			<aside className={styles.aside}>
				<IconButton onClick={toggleMenu}>
					<Menu />
				</IconButton>
				<InfinityScroll lastItemNode={lastItemNode} onObserve={getNextPaginationData}>
					<>
						{isLoading && animeList.length === 0 && <AppShadowLoader />}
						{animeList.map((anime, index) => (
							<Box key={anime.id}>
								<AnimeCard ref={index === animeList.length - 1 ? getLastAnimeNode : null} anime={anime} />
								<Divider />
							</Box>
						))}
					</>
				</InfinityScroll>
			</aside>
			<Outlet />
		</Box>
	);
};

export const AnimePage = memo(AnimePageComponent);
