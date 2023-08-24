import { memo, useEffect, FC, useRef, useState, useMemo } from 'react';
import { Button, Divider, TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';

import { fetchGenres } from '@js-camp/react/store/genre/dispatchers';
import { selectGenres } from '@js-camp/react/store/genre/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { PaginationParams } from '@js-camp/core/models/pagination-params';
import { InfinityScroll } from '@js-camp/react/components/InfinityScrollCards';
import { GenreType } from '@js-camp/core/models/genre/genre-type';
import { GenreFilterParams, GenreParams, GenreSortingField } from '@js-camp/core/models/genre/genre-params';
import { Sorting } from '@js-camp/core/models/sorting';
import { clearGenres } from '@js-camp/react/store/genre/slice';
import { MultipleSelect } from '@js-camp/react/components/MultipleSelect/MultipleFilter';

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
	const [parameters, setParameters] = useState<GenreParams>(defaultParams);

	const lastItemRef = useRef<HTMLLIElement | null>(null);

	const handleObserve = () => {
		setParameters(prevState => ({
			...prevState,
			pagination: { ...prevState.pagination, pageNumber: prevState.pagination.pageNumber + 1 },
		}));
	};

	/** Duplication is result of react strict mode. */
	useEffect(() => {
		dispatch(fetchGenres(parameters));
	}, [parameters]);

	const form = useForm<FormValues>({
		defaultValues: defaultFormValues,
	});

	const { register, handleSubmit, control } = form;

	const onSubmit: SubmitHandler<FormValues> = ({ types, search }) => {
		dispatch(clearGenres());
		setParameters({
			...defaultParams,
			filters: new GenreFilterParams({ types, search }),
		});
	};

	/** Getting genre type array. */
	const items = useMemo(() => GenreType.toArray(), [GenreType]);

	return (
		<aside className={styles.aside}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<MultipleSelect
					name={'types'}
					toReadable={GenreType.toReadable}
					control={control}
					items={items}
					title={'Filter'}
				/>
				<TextField label="Search" {...register('search')} />
				<Button type="submit">Submit</Button>
			</form>
			<InfinityScroll lastItemRef={lastItemRef} onObserve={handleObserve}>
				{genres.map((genre, index) => (
					<>
						<GenreCard ref={index === genres.length - 1 ? lastItemRef : null} key={genre.id} genre={genre} />
						<Divider />
					</>
				))}
			</InfinityScroll>
		</aside>
	);
};

export const GenresPage = memo(GenresPageComponent);
