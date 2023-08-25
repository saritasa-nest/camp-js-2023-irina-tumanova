import { memo, useEffect, FC, useMemo, useState, useRef } from 'react';
import { Box, Button, Drawer, IconButton, TextField } from '@mui/material';
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
import { clearAnimeList } from '@js-camp/react/store/anime/slice';
import { AnimeType } from '@js-camp/core/models/anime/anime-type';
import { MultipleSelect } from '@js-camp/react/components/MultipleSelect';
import { AppShadowLoader } from '@js-camp/react/components/AppShadowLoader';
import { InfinityScroll } from '@js-camp/react/components/InfinityScroll';

import { AnimeCard } from '../../components/AnimeCard';
import styles from './AnimePage.module.css';

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
	sorting: animeSortingFields,
};

/** Anime page component. */
const AnimePageComponent: FC = () => {
	const dispatch = useAppDispatch();
	const animeList = useAppSelector(selectAnime);
	const isLoading = useAppSelector(selectIsAnimeLoading);
	const items = useMemo(() => AnimeType.toArray(), [AnimeType]);

	const [isOpenMenu, setIsOpenMenu] = useState(false);
	const [parameters, setParameters] = useState<AnimeParams>(defaultParams);

	const lastItemRef = useRef<HTMLLIElement | null>(null);

	useEffect(() => {
		dispatch(fetchAnime(parameters));
	}, [parameters]);

	const handleObserve = () => {
		setParameters(prevState => ({
			...prevState,
			pagination: { ...prevState.pagination, pageNumber: prevState.pagination.pageNumber + 1 },
		}));
	};

	const form = useForm<FormValues>({
		defaultValues: defaultFormValues,
	});

	const { register, handleSubmit, control } = form;

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

	return (
		<Box sx={{ flex: 1, display: 'flex' }}>
			<Drawer open={isOpenMenu} onClose={toggleMenu}>
				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<TextField label="Search" {...register('search')} />
					<MultipleSelect
						name={'types'}
						toReadable={AnimeType.toReadable}
						control={control}
						items={items}
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
				<InfinityScroll lastItemRef={lastItemRef} onObserve={handleObserve}>
					<>
						{isLoading && animeList.length === 0 && <AppShadowLoader />}
						{animeList.map((anime, index) => (
							<AnimeCard
								ref={index === animeList.length - 1 ? lastItemRef : null}
								key={anime.id}
								anime={anime}
							/>
						))}
					</>
				</InfinityScroll>
			</aside>
			<Outlet />
		</Box>
	);
};

export const AnimePage = memo(AnimePageComponent);
