import { memo, forwardRef } from 'react';
import { ListItem, ListItemText, Typography } from '@mui/material';

import { Anime } from '@js-camp/core/models/anime/anime';
import { AnimeType } from '@js-camp/core/models/anime/anime-type';

import styles from './AnimeCard.module.css';

interface Props {

	/** Genre. */
	readonly anime: Anime;
}

/** Card with genre data. */
const AnimeCardComponent = forwardRef<HTMLLIElement | null, Props>(({ anime }, forwardedRef) => (
	<ListItem ref={forwardedRef} alignItems="flex-start" className={styles.card}>
		<ListItemText
			primary={anime.titleEnglish}
			secondary={
				<Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
					{AnimeType.toReadable(anime.type)} {anime.status}
				</Typography>
			}
		/>
	</ListItem>
));

export const AnimeCard = memo(AnimeCardComponent);
