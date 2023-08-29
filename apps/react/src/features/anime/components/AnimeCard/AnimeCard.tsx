import { memo, forwardRef } from 'react';
import { Avatar, ListItem, ListItemText, Typography } from '@mui/material';

import { Anime } from '@js-camp/core/models/anime/anime';
import { AnimeType } from '@js-camp/core/models/anime/anime-type';

import styles from './AnimeCard.module.css';

interface Props {

	/** Anime. */
	readonly anime: Anime;
}

/** Card with anime data. */
const AnimeCardComponent = forwardRef<HTMLLIElement | null, Props>(({ anime }, forwardedRef) => (
	<ListItem ref={forwardedRef} className={styles.animeCard}>
		<Avatar className={styles.animeAvatar} src={anime.imageUrl}></Avatar>
		<ListItemText
			primary={
				<Typography component="h4" variant="body2">
					{anime.titleJapanese}
					<br />
					{anime.titleEnglish}
				</Typography>
			}
			secondary={
				<Typography component="span" variant="body2">
					Type: {AnimeType.toReadable(anime.type)}
					<br />
					Status: {anime.status}
				</Typography>
			}
		/>
	</ListItem>
));

export const AnimeCard = memo(AnimeCardComponent);
