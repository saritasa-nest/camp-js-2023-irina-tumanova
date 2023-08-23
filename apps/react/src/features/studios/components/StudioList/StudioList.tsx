import { Divider, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { FC, memo, useState } from 'react';
import VideocamIcon from '@mui/icons-material/Videocam';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router';

import { Studio } from '@js-camp/core/models/studio/studio';

interface Props {

	/** Studios. */
	readonly studios: readonly Studio[];
}

const StudioListComponent: FC<Props> = ({ studios }) => {
	const navigate = useNavigate();
	const [selectedIndex, setSelectedIndex] = useState<number>();

	const handleListItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
		setSelectedIndex(index);
		navigate(`/studios/${index}`);
	};

	return (
		<List>
			{studios.map(studio => (
				<Box key={studio.id}>
					<ListItemButton
						selected={selectedIndex === studio.id}
						alignItems="center"
						onClick={event => {
							handleListItemClick(event, studio.id);
						}}
					>
						<ListItemIcon>
							<VideocamIcon />
						</ListItemIcon>
						<ListItemText primary={studio.name}></ListItemText>
					</ListItemButton>
					<Divider></Divider>
				</Box>
			))}
		</List>
	);
};
export const StudioList = memo(StudioListComponent);
