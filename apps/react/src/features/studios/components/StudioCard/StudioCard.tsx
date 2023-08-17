import { Studio } from '@js-camp/core/models/anime/studio';
import { Divider, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { FC, memo } from 'react';
import VideocamIcon from '@mui/icons-material/Videocam';

interface Props {

	/** Studio. */
	readonly studio: Studio;
}

const StudioCardComponent: FC<Props> = ({ studio }) => (
	<div>
		<ListItem alignItems="center">
			<ListItemIcon>
				<VideocamIcon />
			</ListItemIcon>
			<ListItemText primary={studio.name}></ListItemText>
		</ListItem>
		<Divider></Divider>
	</div>
);

export const StudioCard = memo(StudioCardComponent);
