import { Box, List, ListItemText, Typography } from '@mui/material';
import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { AppShadowLoader } from '@js-camp/react/components/AppShadowLoader';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { selectStudioDetails } from '@js-camp/react/store/studio-details/selectors';
import { fetchStudioDetails } from '@js-camp/react/store/studio-details/dispatchers';
import { NotFoundPage } from '@js-camp/react/features/NotFoundPage/NotFoundPage';
import { typedMemo } from '@js-camp/react/utils/typedMemo';

import styles from './StudioDetailsPage.module.css';

/** Studio details page component. */
const StudioDetailsPageComponent: FC = () => {
	const { id } = useParams();
	const { studiosDetails, isLoading, error } = useAppSelector(selectStudioDetails);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchStudioDetails(Number(id)));
	}, [id]);

	if (error != null) {
		return <NotFoundPage error={error} />;
	}

	if (isLoading) {
		return <AppShadowLoader />;
	}

	return (
		studiosDetails && (
			<Box className={styles.detailsСontainer}>
				<Typography className={styles.detailsTitle} variant="h4" component="h2">
					Studio details
				</Typography>
				<Box className={styles.imageWrapper}>
					<img
						className={styles.image}
						src={studiosDetails.thumbnailImg}
						alt={`${studiosDetails.name} image`}
					/>
				</Box>
				<List>
					<ListItemText primary='Name:' secondary={studiosDetails.name} />
				</List>
			</Box>
		)
	);
};

export const StudioDetailsPage = typedMemo(StudioDetailsPageComponent);
