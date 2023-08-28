import { memo, useEffect, FC, useState, useCallback } from 'react';
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
import { InfinityScroll } from '@js-camp/react/components/InfinityScroll';

import styles from './AnimePage.module.css';
import { AnimeCard } from '../../components/AnimeCard';

const animeSortingFields: Sorting<AnimeSortingField>[] = [
	{ field: AnimeSortingField.TitleEnglish, direction: '' },
	{ field: AnimeSortingField.Status, direction: '' },
];

const defaultParams: AnimeParams = {
	pagination: new PaginationParams({ pageSize: 15, pageNumber: 0 }),
	sorting: animeSortingFields,
	filters: new AnimeFilterParams({ types: [], search: '' }),
};

/** Form values. */
interface FormValues {

	/** Anime types. */
	types: AnimeType[];

	/** Search. */
	search: string;

	/** Anime sorting field. */
	sorting: Sorting<AnimeSortingField>[];
}

const defaultFormValues: FormValues = {
	types: [],
	search: '',
	sorting: animeSortingFields,
};

/** Anime page component. */
const AnimePageComponent: FC = () => {
	const dispatch = useAppDispatch();
	const animeList = useAppSelector(selectAnime);
	const isLoading = useAppSelector(selectIsAnimeLoading);

	const [isOpenMenu, setIsOpenMenu] = useState(false);
	const [parameters, setParameters] = useState<AnimeParams>(defaultParams);

	const [lastItemNode, setLastItemNode] = useState<HTMLLIElement | null>(null);

	const getNextPaginationData = () => {
		setParameters(prevState => ({
			...prevState,
			pagination: { ...prevState.pagination, pageNumber: prevState.pagination.pageNumber + 1 },
		}));
	};

	useEffect(() => {
		dispatch(clearAnimeListState());
	}, []);

	useEffect(() => {
		dispatch(fetchAnime(parameters));
	}, [parameters]);

	const { register, handleSubmit, control } = useForm<FormValues>({
		defaultValues: defaultFormValues,
	});

	const toggleMenu = () => {
		setIsOpenMenu(prevState => !prevState);
	};

	const onSubmit: SubmitHandler<FormValues> = ({ types, search, sorting }) => {
		dispatch(clearAnimeList());
		setParameters({
			...defaultParams,
			sorting,
			filters: new AnimeFilterParams({ types, search }),
		});
		toggleMenu();
	};

	const getLastAnimeNode = useCallback((node: HTMLLIElement) => {
		setLastItemNode(node);
	}, []);

	return (
		<Box sx={{ flex: 1, display: 'flex' }}>
			<Drawer open={isOpenMenu} onClose={toggleMenu}>
				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<TextField label="Search" {...register('search')} />
					<MultipleSelect
						name={'types'}
						toReadable={AnimeType.toReadable}
						control={control}
						items={AnimeType.toArray()}
						title={'Filter'}
					/>
					<MultipleSort
						name={'sorting'}
						control={control}
						title={'Sorting'}
						toReadable={AnimeSortingField.toReadable}
					/>
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
								<AnimeCard
									ref={index === animeList.length - 1 ? getLastAnimeNode : null}
									anime={anime}
								/>
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
