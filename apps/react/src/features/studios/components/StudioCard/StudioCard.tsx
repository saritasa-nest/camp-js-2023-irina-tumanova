import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { forwardRef, memo } from 'react';

import { Studio } from '@js-camp/core/models/studio/studio';

import styles from './StudioCard.module.css';

interface Props {

	/** Studio. */
	readonly studio: Studio;
}

const StudioCardComponent = forwardRef<HTMLLIElement | null, Props>(({ studio }, forwardedRef) => (
	<ListItem ref={forwardedRef} className={styles.studioCard}>
		<ListItemAvatar className={styles.avatar}>
			<Avatar alt="Studio cover" src={studio.thumbnailImg} className={styles.avatarImg} />
		</ListItemAvatar>
		<ListItemText primary={<Typography fontSize={17}>{studio.name}</Typography>} />
	</ListItem>
));

export const StudioCard = memo(StudioCardComponent);
