import { memo, useEffect, FC, useRef, useState, useMemo } from 'react';
import { Box, Button, Drawer, IconButton, TextField } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Outlet } from 'react-router-dom';

import { fetchGenres } from '@js-camp/react/store/genre/dispatchers';
import { selectAreGenresLoading, selectGenres } from '@js-camp/react/store/genre/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { PaginationParams } from '@js-camp/core/models/pagination-params';
import { InfinityScroll } from '@js-camp/react/components/InfinityScrollCards';
import { MultipleFilter } from '@js-camp/react/components/MultipleFilter/MultipleFilter';
import { GenreType } from '@js-camp/core/models/genre/genre-type';
import { GenreFilterParams, GenreParams } from '@js-camp/core/models/genre/genre-params';
import { Sorting } from '@js-camp/core/models/sorting';
import { clearGenres } from '@js-camp/react/store/genre/slice';
import { GenreSortingField } from '@js-camp/core/models/genre/genre-sort';
import { MultipleSort } from '@js-camp/react/components/MultipleSort/MultipleSort';
import { AppShadowLoader } from '@js-camp/react/components/AppShadowLoader';

import { GenreCard } from '../../components/GenreCard';
import styles from './GenrePage.module.css';

const genreSoringFields: Sorting<GenreSortingField>[] = [
	{ field: GenreSortingField.Name, direction: '' },
	{ field: GenreSortingField.Type, direction: '' },
];

const defaultParams: GenreParams = {
	pagination: new PaginationParams({ pageSize: 15, pageNumber: 0 }),
	sorting: genreSoringFields,
	filters: new GenreFilterParams({ types: [], search: '' }),
};

/** Form values. */
interface FormValues {

	/** Genre types. */
	types: GenreType[];

	/** Search. */
	search: string;

	/** Genre sorting fields. */
	sorting: Sorting<GenreSortingField>[];
}

const defaultFormValues: FormValues = {
	types: [],
	search: '',
	sorting: genreSoringFields,
};

/** Genres page component. */
const GenresPageComponent: FC = () => {
	const dispatch = useAppDispatch();
	const genres = useAppSelector(selectGenres);
	const isLoading = useAppSelector(selectAreGenresLoading);
	const items = useMemo(() => GenreType.toArray(), [GenreType]);

	const [isOpenMenu, setIsOpenMenu] = useState(false);
	const [parameters, setParameters] = useState<GenreParams>(defaultParams);

	const lastItemRef = useRef<HTMLLIElement | null>(null);

	useEffect(() => {
		dispatch(fetchGenres(parameters));
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
		dispatch(clearGenres());
		setParameters({
			...defaultParams,
			sorting,
			filters: new GenreFilterParams({ types, search }),
		});
		toggleMenu();
	};

	return (
		<Box sx={{ flex: 1, display: 'flex' }}>
			<Drawer open={isOpenMenu} onClose={toggleMenu}>
				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<TextField label="Search" {...register('search')} />
					<MultipleFilter
						name={'types'}
						toReadable={GenreType.toReadable}
						control={control}
						items={items}
						title={'Filter'}
					/>
					<MultipleSort
						name={'sorting'}
						control={control}
						title={'Sorting'}
						toReadable={GenreSortingField.toReadable}
					/>
					<Button type="submit">Apply</Button>
				</form>
			</Drawer>
			<aside className={styles.aside}>
				<IconButton onClick={toggleMenu}>
					<Menu />
				</IconButton>
				<InfinityScroll lastItemRef={lastItemRef} handleObserve={handleObserve}>
					<>
						{isLoading && genres.length === 0 && <AppShadowLoader />}
						{genres.map((genre, index) => (
							<GenreCard ref={index === genres.length - 1 ? lastItemRef : null} key={genre.id} genre={genre} />
						))}
					</>
				</InfinityScroll>
			</aside>
			<Outlet />
		</Box>
	);
};

export const GenresPage = memo(GenresPageComponent);
