import { memo, useEffect, FC, useState, useCallback } from 'react';
import { Box, Button, Divider, Drawer, IconButton, TextField } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Outlet } from 'react-router-dom';

import { fetchGenres } from '@js-camp/react/store/genre/dispatchers';
import { selectAreGenresLoading, selectGenres } from '@js-camp/react/store/genre/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { PaginationParams } from '@js-camp/core/models/pagination-params';
import { InfinityScroll } from '@js-camp/react/components/InfinityScroll';
import { GenreType } from '@js-camp/core/models/genre/genre-type';
import { GenreFilterParams, GenreParams } from '@js-camp/core/models/genre/genre-params';
import { SortDirection, Sorting } from '@js-camp/core/models/sorting';
import { clearGenres, clearGenresState } from '@js-camp/react/store/genre/slice';
import { GenreSortingField } from '@js-camp/core/models/genre/genre-sort';
import { MultipleSort } from '@js-camp/react/components/MultipleSort/MultipleSort';
import { AppShadowLoader } from '@js-camp/react/components/AppShadowLoader';
import { MultipleSelect } from '@js-camp/react/components/MultipleSelect';

import { GenreCard } from '../../components/GenreCard';
import styles from './GenrePage.module.css';

const genreSoringFields: readonly Sorting<GenreSortingField>[] = [
	{ field: GenreSortingField.Name, direction: SortDirection.None },
	{ field: GenreSortingField.Type, direction: SortDirection.None },
];

const defaultParams: GenreParams = {
	pagination: new PaginationParams({ pageSize: 15, pageNumber: 0 }),
	sorting: genreSoringFields,
	filters: new GenreFilterParams({ types: [], search: '' }),
};

/** Form values. */
interface FormValues {

	/** Genre types. */
	readonly types: GenreType[];

	/** Search. */
	readonly search: string;

	/** Genre sorting fields. */
	readonly sorting: readonly Sorting<GenreSortingField>[];
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

	const [isOpenMenu, setIsOpenMenu] = useState(false);
	const [parameters, setParameters] = useState<GenreParams>(defaultParams);

	const [lastItemNode, setLastItemNode] = useState<HTMLLIElement | null>(null);

	const getNextPaginationData = () => {
		setParameters(prevState => ({
			...prevState,
			pagination: { ...prevState.pagination, pageNumber: prevState.pagination.pageNumber + 1 },
		}));
	};

	useEffect(() => {
		dispatch(clearGenresState());
	}, []);

	useEffect(() => {
		dispatch(fetchGenres(parameters));
	}, [parameters]);

	const { register, handleSubmit, control } = useForm<FormValues>({
		defaultValues: defaultFormValues,
	});

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

	const getLastItemNode = useCallback((node: HTMLLIElement) => {
		setLastItemNode(node);
	}, []);

	return (
		<Box sx={{ flex: 1, display: 'flex' }}>
			<Drawer open={isOpenMenu} onClose={toggleMenu}>
				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<TextField label="Search" {...register('search')} />
					<MultipleSelect
						name='types'
						title='Filter'
						toReadable={GenreType.toReadable}
						control={control}
						items={GenreType.toArray()}
					/>
					<MultipleSort
						name='sorting'
						title='Sorting'
						control={control}
						toReadable={GenreSortingField.toReadable}
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
						{isLoading && genres.length === 0 && <AppShadowLoader />}
						{genres.map((genre, index) => (
							<Box key={genre.id}>
								<GenreCard ref={index === genres.length - 1 ? getLastItemNode : null} genre={genre} />
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

export const GenresPage = memo(GenresPageComponent);
