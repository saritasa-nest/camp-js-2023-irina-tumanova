import { memo, forwardRef } from 'react';
import { ListItem, ListItemText, Typography } from '@mui/material';

import { Genre } from '@js-camp/core/models/genre/genre';
import { GenreType } from '@js-camp/core/models/genre/genre-type';

import styles from './GenreCard.module.css';

interface Props {

	/** Genre. */
	readonly genre: Genre;
}

/** Card with genre data. */
const GenreCardComponent = forwardRef<HTMLLIElement | null, Props>(({ genre }, forwardedRef) => (
	<>
		<ListItem ref={forwardedRef} alignItems="flex-start" className={styles.card}>
			<ListItemText
				primary={genre.name}
				secondary={
					<Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
						{GenreType.toReadable(genre.type)}
					</Typography>
				}
			/>
		</ListItem>
	</>
));

export const GenreCard = memo(GenreCardComponent);
