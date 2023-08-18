import { memo, useEffect, FC, useRef, useState } from 'react';
import { fetchGenres } from '@js-camp/react/store/genre/dispatchers';
import { selectGenres } from '@js-camp/react/store/genre/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';

import { List } from '@mui/material';
import { PaginationParams } from '@js-camp/core/models/pagination-params';
import { useIntersectionObserver } from '@js-camp/react/hooks/useIntersactionObserver';

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

	useEffect(() => {
		dispatch(fetchGenres(parameters));
	}, [parameters]);

	const handleObserve = () => {
		setParameters(prevState => ({ ...prevState, pageNumber: prevState.pageNumber + 1 }));
	};

	useIntersectionObserver(rootRef, lastItemRef, handleObserve);

	return (
		<div>
			<List ref={rootRef} sx={{ maxHeight: 200, width: 200, overflow: 'auto	' }}>
				{genres.map((genre, index) => (
					<GenreCard ref={index === genres.length - 1 ? lastItemRef : null} key={genre.id} genre={genre} />
				))}
			</List>
		</div>
	);
};

export const GenresPage = memo(GenresPageComponent);
