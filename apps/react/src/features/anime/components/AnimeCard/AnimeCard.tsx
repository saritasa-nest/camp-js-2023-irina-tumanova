import { memo, forwardRef } from 'react';
import { Avatar, ListItem, ListItemText, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { Anime } from '@js-camp/core/models/anime/anime';
import { AnimeType } from '@js-camp/core/models/anime/anime-type';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { clearAnimeDetailsErrorsState } from '@js-camp/react/store/anime-details/slice';
import { selectAnimeDetailsError } from '@js-camp/react/store/anime-details/selectors';

import styles from './AnimeCard.module.css';

interface Props {

	/** Anime. */
	readonly anime: Anime;
}

/** Card with anime data. */
const AnimeCardComponent = forwardRef<HTMLLIElement | null, Props>(({ anime }, forwardedRef) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const errors = useAppSelector(selectAnimeDetailsError);

	const handleNavigateToDetails = () => {
		if (errors) {
			dispatch(clearAnimeDetailsErrorsState());
		}
		navigate(`${anime.id}`);
	};

	return (
		<ListItem
			ref={forwardedRef}
			alignItems="flex-start"
			className={styles.animeCard}
			onClick={handleNavigateToDetails}
		>
			<Avatar sx={{ width: 80, height: 80 }} src={anime.imageUrl}></Avatar>
			<ListItemText
				primary={
					<Typography sx={{ display: 'inline' }} component="h4" variant="body2" color="text.primary">
						{anime.titleJapanese}
						<br />
						{anime.titleEnglish}
					</Typography>
				}
				secondary={
					<Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
						Type: {AnimeType.toReadable(anime.type)}
						<br />
						Status: {anime.status}
					</Typography>
				}
			/>
		</ListItem>
	);
});

export const AnimeCard = memo(AnimeCardComponent);
