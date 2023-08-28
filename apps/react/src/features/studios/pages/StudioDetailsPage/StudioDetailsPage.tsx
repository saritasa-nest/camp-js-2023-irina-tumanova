import { Box, List, ListItem, Typography } from '@mui/material';
import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { AppShadowLoader } from '@js-camp/react/components/AppShadowLoader';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import {
	selectAreStudioDetailsLoading,
	selectStudioDetails,
	selectStudioDetailsErrors,
} from '@js-camp/react/store/studio-details/selectors';
import { fetchStudioDetails } from '@js-camp/react/store/studio-details/dispatchers';
import { NotFoundPage } from '@js-camp/react/features/NotFoundPage/NotFoundPage';
import { typedMemo } from '@js-camp/react/utils/typedMemo';

import styles from './StudioDetailsPage.module.css';

/** Studio details page component. */
const StudioDetailsPageComponent: FC = () => {
	const { id } = useParams();
	const isLoading = useAppSelector(selectAreStudioDetailsLoading);
	const studio = useAppSelector(selectStudioDetails);
	const errors = useAppSelector(selectStudioDetailsErrors);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (id) {
			dispatch(fetchStudioDetails(Number(id)));
		}
	}, [id]);

	if (errors) {
		return <NotFoundPage error={errors} />;
	}

	if (isLoading) {
		return <AppShadowLoader />;
	}

	return (
		studio && (
			<Box className={styles['details-container']}>
				<Typography className={styles['details-title']} variant="h4" component="h2">
					Studio details
				</Typography>
				<List>
					<ListItem>
						<span className={styles['details-subtitle']}>Name:</span>
						{studio.name}
					</ListItem>
				</List>
			</Box>
		)
	);
};

export const StudioDetailsPage = typedMemo(StudioDetailsPageComponent);
