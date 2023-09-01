import { memo, FC } from 'react';
import { Avatar, ListItem, ListItemText, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { Anime } from '@js-camp/core/models/anime/anime';
import { AnimeType } from '@js-camp/core/models/anime/anime-type';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { selectAnimeDetailsError } from '@js-camp/react/store/anime-details/selectors';
import { clearAnimeDetailsErrorsState } from '@js-camp/react/store/anime-details/slice';

import styles from '../AnimeCard.module.css';

interface Props {

	/** Anime. */
	readonly anime: Anime;
}

/** Card with anime data. */
const DefaultAnimeCardComponent: FC<Props> = ({ anime }) => {
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
		<ListItem className={styles.animeCard} onClick={handleNavigateToDetails}>
			<Avatar className={styles.animeAvatar} src={anime.imageUrl}/>
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
	);
};

export const DefaultAnimeCard = memo(DefaultAnimeCardComponent);
