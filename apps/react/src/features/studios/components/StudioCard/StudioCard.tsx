import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { forwardRef, memo } from 'react';

import { Studio } from '@js-camp/core/models/studio/studio';

interface Props {

	/** Studio. */
	readonly studio: Studio;
}

const StudioCardComponent = forwardRef<HTMLLIElement | null, Props>(({ studio }, forwardedRef) => (
	<>
		<ListItem ref={forwardedRef} sx={{ alignItems: 'center', gap: '25px' }}>
			<ListItemAvatar sx={{ width: 80, height: 80 }}>
				<Avatar alt="Studio cover" src={studio.thumbnailImg} sx={{ width: '100%', height: '100%' }} />
			</ListItemAvatar>
			<ListItemText primary={<Typography fontSize={17}>{studio.name}</Typography>} />
		</ListItem>
	</>
));
export const StudioCard = memo(StudioCardComponent);
