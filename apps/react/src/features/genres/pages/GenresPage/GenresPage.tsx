import { memo, useEffect, FC, useRef, useState, useMemo } from 'react';
import { Box, Button, Drawer, IconButton, TextField } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { SubmitHandler, useForm } from 'react-hook-form';

import { fetchGenres } from '@js-camp/react/store/genre/dispatchers';
import { selectGenres } from '@js-camp/react/store/genre/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { PaginationParams } from '@js-camp/core/models/pagination-params';
import { InfinityScroll } from '@js-camp/react/components/InfinityScrollCards';
import { MultipleFilter } from '@js-camp/react/components/MultipleFilter/MultipleFilter';
import { GenreType } from '@js-camp/core/models/genre/genre-type';
import { GenreFilterParams, GenreParams, GenreSortingField } from '@js-camp/core/models/genre/genre-params';
import { Sorting } from '@js-camp/core/models/sorting';
import { clearGenres } from '@js-camp/react/store/genre/slice';

import { GenreCard } from '../../components/GenreCard';
import styles from './GenrePage.module.css';

const defaultParams: GenreParams = {
	pagination: new PaginationParams({ pageSize: 5, pageNumber: 0 }),
	sorting: new Sorting({ field: GenreSortingField.None, direction: 'asc' }),
	filters: new GenreFilterParams({ types: [], search: '' }),
};

/** Form values. */
interface FormValues {
	/** Genre types. */
	types: GenreType[];

	/** Search. */
	search: string;
}

const defaultFormValues: FormValues = {
	types: [],
	search: '',
};

/** Genres page component. */
const GenresPageComponent: FC = () => {
	const dispatch = useAppDispatch();
	const genres = useAppSelector(selectGenres);
	const items = useMemo(() => GenreType.toArray(), [GenreType]);

	const [isOpenMenu, setIsOpenMenu] = useState(false);
	const [parameters, setParameters] = useState<GenreParams>(defaultParams);

	const lastItemRef = useRef<HTMLLIElement | null>(null);

	useEffect(() => {
		dispatch(fetchGenres(parameters));
	}, [parameters]);

	const handleObserve = () => {
		setParameters((prevState) => ({
			...prevState,
			pagination: { ...prevState.pagination, pageNumber: prevState.pagination.pageNumber + 1 },
		}));
	};

	const form = useForm<FormValues>({
		defaultValues: defaultFormValues,
	});

	const { register, handleSubmit, control } = form;

	const toggleMenu = () => {
		setIsOpenMenu((prevState) => !prevState);
	};

	const onSubmit: SubmitHandler<FormValues> = ({ types, search }) => {
		dispatch(clearGenres());
		setParameters({
			...defaultParams,
			filters: new GenreFilterParams({ types, search }),
		});
		toggleMenu();
	};

	return (
		<>
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
					<Button type="submit">Apply</Button>
				</form>
			</Drawer>
			<Box sx={{ display: 'flex', height: '100%', maxHeight: '100%' }}>
				<aside className={styles.aside}>
					<IconButton onClick={toggleMenu}>
						<Menu />
					</IconButton>
					<InfinityScroll lastItemRef={lastItemRef} handleObserve={handleObserve}>
						{genres.map((genre, index) => (
							<GenreCard ref={index === genres.length - 1 ? lastItemRef : null} key={genre.id} genre={genre} />
						))}
					</InfinityScroll>
				</aside>
			</Box>
		</>
	);
};

export const GenresPage = memo(GenresPageComponent);
