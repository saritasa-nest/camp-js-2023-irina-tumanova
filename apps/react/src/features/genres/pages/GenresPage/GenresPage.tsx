import styles from './GenrePage.module.css';
import { memo, useEffect, FC, useRef, useState, useMemo } from 'react';
import { fetchGenres } from '@js-camp/react/store/genre/dispatchers';
import { selectGenres } from '@js-camp/react/store/genre/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { PaginationParams } from '@js-camp/core/models/pagination-params';

import { InfinityScroll } from '@js-camp/react/components/InfinityScrollCards';

import { GenreCard } from '../../components/GenreCard';
import { MultipleFilter } from '@js-camp/react/components/MultipleFilter/MultipleFilter';
import { GenreType } from '@js-camp/core/models/genre/genre-type';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { GenreFilterParams, GenreParams, GenreSortingField } from '@js-camp/core/models/genre/genre-params';
import { Sorting } from '@js-camp/core/models/sorting';
import { clearGenres } from '@js-camp/react/store/genre/slice';

const defaultParams: GenreParams = {
	pagination: new PaginationParams({ pageSize: 5, pageNumber: 0 }),
	sorting: new Sorting({ field: GenreSortingField.None, direction: 'asc' }),
	filters: new GenreFilterParams({ types: [], search: '' }),
};

/** Form values. */
interface FormValues {
	/** Genre types. */
	types: GenreType[];
}

/** Genres page component. */
const GenresPageComponent: FC = () => {
	const dispatch = useAppDispatch();
	const genres = useAppSelector(selectGenres);
	const [parameters, setParameters] = useState<GenreParams>(defaultParams);

	const lastItemRef = useRef<HTMLLIElement | null>(null);

	const handleObserve = () => {
		setParameters((prevState) => ({
			...prevState,
			pagination: { ...prevState.pagination, pageNumber: prevState.pagination.pageNumber + 1 },
		}));
	};

	/** Duplication is result of react strict mode. */
	useEffect(() => {
		dispatch(fetchGenres(parameters));
	}, [parameters]);

	const form = useForm<FormValues>({
		defaultValues: {
			types: [],
		},
	});

	const { register, handleSubmit } = form;

	const onSubmit = (data: FormValues) => {
		dispatch(clearGenres());
		setParameters({
			...defaultParams,
			filters: new GenreFilterParams({ types: data.types, search: defaultParams.filters.search }),
		});
	};

	/** Getting genre type array. */
	const items = useMemo(() => Object.values(GenreType).slice(0, -1), [GenreType]) as GenreType[];

	return (
		<aside className={styles.aside}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<MultipleFilter items={items} registerReturn={register('types')} title={'Filter'} />
				<Button type="submit">Submit</Button>
			</form>
			<InfinityScroll lastItemRef={lastItemRef} handleObserve={handleObserve}>
				{genres.map((genre, index) => (
					<GenreCard ref={index === genres.length - 1 ? lastItemRef : null} key={genre.id} genre={genre} />
				))}
			</InfinityScroll>
		</aside>
	);
};

export const GenresPage = memo(GenresPageComponent);
