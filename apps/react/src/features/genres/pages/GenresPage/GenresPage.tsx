import { memo, useEffect, FC, useRef, useState } from 'react';
import { fetchGenres } from '@js-camp/react/store/genre/dispatchers';
import { selectGenres } from '@js-camp/react/store/genre/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { PaginationParams } from '@js-camp/core/models/pagination-params';

import { InfinityScroll } from '@js-camp/react/components/InfinityScrollCards';

import { GenreCard } from '../../components/GenreCard';

const defaultParams: PaginationParams = {
	pageNumber: 0,
	pageSize: 5,
};

/** Genres page component. */
const GenresPageComponent: FC = () => {
	const dispatch = useAppDispatch();
	const genres = useAppSelector(selectGenres);
	const [parameters, setParameters] = useState<PaginationParams>(defaultParams);

	const rootRef = useRef<HTMLUListElement | null>(null);
	const lastItemRef = useRef<HTMLLIElement | null>(null);

	const handleObserve = () => {
		setParameters((prevState) => ({ ...prevState, pageNumber: prevState.pageNumber + 1 }));
	};

	/** Duplication is result of react strict mode. */
	useEffect(() => {
		dispatch(fetchGenres(parameters));
	}, [parameters]);

	// this resolve duplication of data.
	// useEffect(() => {
	// 	dispatch(fetchGenres(defaultParams));
	// }, []);

	// useEffect(() => {
	// 	if (parameters.pageNumber !== defaultParams.pageNumber) {
	// 		dispatch(fetchGenres(parameters));
	// 	}
	// }, [parameters]);

	return (
		<aside className="">
			<InfinityScroll ref={rootRef} lastItemRef={lastItemRef} handleObserve={handleObserve}>
				{genres.map((genre, index) => (
					<GenreCard ref={index === genres.length - 1 ? lastItemRef : null} key={genre.id} genre={genre} />
				))}
			</InfinityScroll>
		</aside>
	);
};

export const GenresPage = memo(GenresPageComponent);
