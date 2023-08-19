import styles from './GenrePage.module.css';
import { memo, useEffect, FC, useRef, useState, useMemo } from 'react';
import { fetchGenres } from '@js-camp/react/store/genre/dispatchers';
import { selectGenres } from '@js-camp/react/store/genre/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { PaginationParams } from '@js-camp/core/models/pagination-params';

import { InfinityScroll } from '@js-camp/react/components/InfinityScrollCards';

import { GenreCard } from '../../components/GenreCard';
import { MultipleFilter } from '@js-camp/react/components/MultipleFilter/MultipleFilter';
import { GenreType } from '@js-camp/core/models/anime/genre-type';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';

const defaultParams: PaginationParams = {
	pageNumber: 0,
	pageSize: 5,
};

interface FormValues {
	filter: GenreType[];
}

/** Genres page component. */
const GenresPageComponent: FC = () => {
	const dispatch = useAppDispatch();
	const genres = useAppSelector(selectGenres);
	const [parameters, setParameters] = useState<PaginationParams>(defaultParams);

	const lastItemRef = useRef<HTMLLIElement | null>(null);

	const handleObserve = () => {
		setParameters((prevState) => ({ ...prevState, pageNumber: prevState.pageNumber + 1 }));
	};

	/** Duplication is result of react strict mode. */
	useEffect(() => {
		dispatch(fetchGenres(parameters));
	}, [parameters]);

	const form = useForm<FormValues>({
		defaultValues: {
			filter: [],
		},
	});

	const { register, handleSubmit } = form;

	const onSubmit = (data: FormValues) => {
		console.log(data.filter);
	};

	/** Getting genre type array. */
	const items = useMemo(() => Object.values(GenreType).slice(0, -1), [GenreType]) as GenreType[];

	return (
		<aside className={styles.aside}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<MultipleFilter registerReturn={register('filter')} title={'Filter'} items={items} />
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
