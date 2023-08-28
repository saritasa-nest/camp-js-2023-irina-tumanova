import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { forwardRef, memo } from 'react';
import { useNavigate } from 'react-router-dom';

import { Studio } from '@js-camp/core/models/studio/studio';
import { clearStudioDetailsErrorsState } from '@js-camp/react/store/studio-details/slice';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { selectStudioDetailsErrors } from '@js-camp/react/store/studio-details/selectors';

import styles from './StudioCard.module.css';

interface Props {

	/** Studio. */
	readonly studio: Studio;
}

const StudioCardComponent = forwardRef<HTMLLIElement | null, Props>(({ studio }, forwardedRef) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const errors = useAppSelector(selectStudioDetailsErrors);

	const handleNavigateToDetails = () => {
		if (errors) {
			dispatch(clearStudioDetailsErrorsState());
		}
		navigate(`${studio.id}`);
	};

	return <ListItem ref={forwardedRef} className={styles['card-container']} onClick={handleNavigateToDetails} sx={{ alignItems: 'center', gap: '25px' }}>
		<ListItemAvatar sx={{ width: 80, height: 80 }}>
			<Avatar alt="Studio cover" src={studio.thumbnailImg} sx={{ width: '100%', height: '100%' }} />
		</ListItemAvatar>
		<ListItemText primary={<Typography fontSize={17}>{studio.name}</Typography>} />
	</ListItem>
});
export const StudioCard = memo(StudioCardComponent);
