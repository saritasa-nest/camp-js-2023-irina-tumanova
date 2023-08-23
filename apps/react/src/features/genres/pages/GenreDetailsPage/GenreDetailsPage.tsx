import { Box } from '@mui/material';
import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { AppShadowLoader } from '@js-camp/react/components/AppShadowLoader';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { fetchGenreDetails } from '@js-camp/react/store/genre-details/dispatchers';
import {
	selectAreGenresDetailsLoading,
	selectGenreDetails,
	selectGenreDetailsErrors,
} from '@js-camp/react/store/genre-details/selectors';
import { typedMemo } from '@js-camp/react/utils/typedMemo';

/** Genre details page component. */
const GenreDetailsPageComponent: FC = () => {
	const { id } = useParams();
	const isLoading = useAppSelector(selectAreGenresDetailsLoading);
	const genre = useAppSelector(selectGenreDetails);
	const errors = useAppSelector(selectGenreDetailsErrors);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (id) {
			dispatch(fetchGenreDetails(Number(id)));
		}
	}, [id]);

	if (errors) {
		return <div>Opps... Something went wrong :() </div>;
	}

	if (isLoading) {
		return <AppShadowLoader />;
	}

	return genre && <Box>{genre.name}</Box>;
};

export const GenreDetailsPage = typedMemo(GenreDetailsPageComponent);
