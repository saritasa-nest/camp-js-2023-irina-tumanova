import { Box, Divider, List, ListItem, Typography } from '@mui/material';
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
import { NotFoundPage } from '@js-camp/react/features/NotFoundPage/NotFoundPage';

import styles from './GenreDetailsPage.module.css';

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
		return <NotFoundPage error={errors} />;
	}

	if (isLoading) {
		return <AppShadowLoader />;
	}

	return (
		genre && (
			<Box className={styles['details-container']}>
				<Typography className={styles['details-title']} variant="h4" component="h2">
					Genre details
				</Typography>
				<List>
					<ListItem>
						<Typography className={styles['details-subtitle']} component='span'>Name:</Typography>
						{genre.name}
					</ListItem>
					<Divider />
					<ListItem>
						<Typography className={styles['details-subtitle']} component='span'>Type:</Typography>
						{genre.type}
					</ListItem>
					<Divider />
				</List>
			</Box>
		)
	);
};

export const GenreDetailsPage = typedMemo(GenreDetailsPageComponent);
