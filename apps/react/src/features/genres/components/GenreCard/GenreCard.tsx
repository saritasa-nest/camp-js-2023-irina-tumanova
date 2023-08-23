import { memo, forwardRef } from 'react';
import { Divider, ListItem, ListItemText, Typography } from '@mui/material';

import { Genre } from '@js-camp/core/models/genre/genre';
import { GenreType } from '@js-camp/core/models/genre/genre-type';

interface Props {
	/** Genre. */
	readonly genre: Genre;
}

/** Card with genre data. */
const GenreCardComponent = forwardRef<HTMLLIElement | null, Props>(({ genre }, forwardedRef) => (
	<>
		<ListItem ref={forwardedRef}>
			<ListItemText
				primary={genre.name}
				secondary={
					<Typography component="span" variant="body2" color="text.primary">
						{GenreType.toReadable(genre.type)}
					</Typography>
				}
			/>
		</ListItem>
		<Divider />
	</>
));

export const GenreCard = memo(GenreCardComponent);
