import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { forwardRef, memo } from 'react';

import { Studio } from '@js-camp/core/models/studio/studio';
import { clearStudioDetailsErrorsState } from '@js-camp/react/store/studio-details/slice';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { selectStudioDetailsErrors } from '@js-camp/react/store/studio-details/selectors';
import { CustomNavLink } from '@js-camp/react/utils/customNavLink';

import styles from './StudioCard.module.css';

interface Props {

	/** Studio. */
	readonly studio: Studio;
}

/** Studio card component. */
const StudioCardComponent = forwardRef<HTMLLIElement | null, Props>(({ studio }, forwardedRef) => {
	const dispatch = useAppDispatch();
	const error = useAppSelector(selectStudioDetailsErrors);

	const handleNavigateToDetails = () => {
		if (error) {
			dispatch(clearStudioDetailsErrorsState());
		}
	};

	return (
		<ListItem
			className={styles.studioCard}
			ref={forwardedRef}
			component={CustomNavLink}
			to={`${studio.id}`}
			onClick={handleNavigateToDetails}>
			<ListItemAvatar className={styles.avatar}>
				<Avatar alt="Studio cover" src={studio.thumbnailImg} className={styles.avatarImg} />
			</ListItemAvatar>
			<ListItemText primary={<Typography fontSize={17}>{studio.name}</Typography>} />
		</ListItem>
	);
});

export const StudioCard = memo(StudioCardComponent);
