import { memo, useEffect, FC, useRef, useState, useMemo } from 'react';
import { Button, TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';

import { fetchGenres } from '@js-camp/react/store/genre/dispatchers';
import { selectGenres } from '@js-camp/react/store/genre/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { PaginationParams } from '@js-camp/core/models/pagination-params';
import { InfinityScroll } from '@js-camp/react/components/InfinityScroll';
import { GenreType } from '@js-camp/core/models/genre/genre-type';
import { GenreFilterParams, GenreParams, GenreSortingField } from '@js-camp/core/models/genre/genre-params';
import { Sorting } from '@js-camp/core/models/sorting';
import { clearGenres } from '@js-camp/react/store/genre/slice';
import { MultipleSelect } from '@js-camp/react/components/MultipleSelect/MultipleSelect';

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
	readonly types: GenreType[];

	/** Search. */
	readonly search: string;
}

const defaultFormValues: FormValues = {
	types: [],
	search: '',
};

/** Genres page component. */
const GenresPageComponent: FC = () => {
	const dispatch = useAppDispatch();
	const genres = useAppSelector(selectGenres);
	const [parameters, setParameters] = useState<GenreParams>(defaultParams);

	const lastItemRef = useRef<HTMLLIElement | null>(null);

	const getNextPaginationData = () => {
		setParameters(prevState => ({
			...prevState,
			pagination: { ...prevState.pagination, pageNumber: prevState.pagination.pageNumber + 1 },
		}));
	};

	useEffect(() => {
		dispatch(fetchGenres(parameters));
	}, [parameters]);

	const { register, handleSubmit, control } = useForm<FormValues>({
		defaultValues: defaultFormValues,
	});

	const onSubmit: SubmitHandler<FormValues> = ({ types, search }) => {
		dispatch(clearGenres());
		setParameters({
			...defaultParams,
			filters: new GenreFilterParams({ types, search }),
		});
	};

	const genreTypes = useMemo(() => GenreType.toArray(), [GenreType]);

	return (
		<aside className={styles.aside}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<MultipleSelect
					name={'types'}
					toReadable={GenreType.toReadable}
					control={control}
					items={genreTypes}
					title={'Filter'}
				/>
				<TextField label="Search" {...register('search')} />
				<Button type="submit">Submit</Button>
			</form>
			<InfinityScroll lastItemRef={lastItemRef} getNextPaginationData={getNextPaginationData}>
				{genres.map((genre, index) => (
					<GenreCard ref={index === genres.length - 1 ? lastItemRef : null} key={genre.id} genre={genre} />
				))}
			</InfinityScroll>
		</aside>
	);
};

export const GenresPage = memo(GenresPageComponent);
