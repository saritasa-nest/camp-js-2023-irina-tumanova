import { memo, forwardRef } from 'react';
import { Avatar, Divider, ListItem, ListItemText, Typography } from '@mui/material';

import { Anime } from '@js-camp/core/models/anime/anime';
import { AnimeType } from '@js-camp/core/models/anime/anime-type';

import styles from './AnimeCard.module.css';

interface Props {

	/** Genre. */
	readonly anime: Anime;
}

/** Card with genre data. */
const AnimeCardComponent = forwardRef<HTMLLIElement | null, Props>(({ anime }, forwardedRef) => (
	<>
		<ListItem ref={forwardedRef} alignItems="flex-start" className={styles.animeCard}>
			<Avatar sx={{ width: 80, height: 80 }} src={anime.imageUrl}></Avatar>
			<ListItemText
				primary={
					<Typography sx={{ display: 'inline' }} component="h4" variant="body2" color="text.primary">
						{anime.titleJapanese}<br/>
						{anime.titleEnglish}
					</Typography>
				}
				secondary={
					<Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
						Type: {AnimeType.toReadable(anime.type)}<br/>
						Status: {anime.status}
					</Typography>
				}
			/>
		</ListItem>
		<Divider />
	</>
));

export const AnimeCard = memo(AnimeCardComponent);
