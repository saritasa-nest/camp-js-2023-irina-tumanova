import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import { forwardRef, memo } from 'react';

import { Studio } from '@js-camp/core/models/studio/studio';

interface Props {

	/** Studio. */
	readonly studio: Studio;
}

const StudioCardComponent = forwardRef<HTMLLIElement | null, Props>(({ studio }, forwardedRef) => (
	<>
		<ListItem ref={forwardedRef}>
			<ListItemButton alignItems="center">
				<ListItemText primary={studio.name}></ListItemText>
			</ListItemButton>
		</ListItem>
	</>
));
export const StudioCard = memo(StudioCardComponent);
