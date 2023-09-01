import { FC, memo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, List, ListItemText } from '@mui/material';
import YouTube, { YouTubeProps } from 'react-youtube';

import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { fetchAnimeDetails } from '@js-camp/react/store/anime-details/dispatchers';
import {
	selectAnimeDetails,
	selectAnimeDetailsError,
	selectIsAnimeDetailsLoading,
} from '@js-camp/react/store/anime-details/selectors';
import { getYearsRange } from '@js-camp/react/utils/getYearsRange';
import { NotFoundPage } from '@js-camp/react/features/NotFoundPage/NotFoundPage';
import { AppShadowLoader } from '@js-camp/react/components/AppShadowLoader';

import { ImageDialog } from '../ImageDialog/index';
import styles from './AnimeDetails.module.css';

const opts: YouTubeProps['opts'] = {
	width: '100%',
	height: '250px',
};

const AnimeDetailsComponent: FC = () => {
	const { id } = useParams();
	const isLoading = useAppSelector(selectIsAnimeDetailsLoading);
	const animeDetails = useAppSelector(selectAnimeDetails);
	const errors = useAppSelector(selectAnimeDetailsError);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (id) {
			dispatch(fetchAnimeDetails(Number(id)));
		}
	}, [id]);

	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	if (errors) {
		return <NotFoundPage error={errors} />;
	}

	if (isLoading) {
		return <AppShadowLoader />;
	}

	return (
		animeDetails && (
			<Box className={styles.wrapper}>

				<Box className={styles.imageWrapper}>
					<img
						className={styles.image}
						src={animeDetails.imageUrl}
						onClick={handleOpen}
						alt="Anime cover image"
					/>
				</Box>
				<ImageDialog open={open} onClose={handleClose} imageSrc={animeDetails.imageUrl} />

				<Box className={styles.infoWrapper}>

					<List>
						<ListItemText primary='Title English:' secondary={animeDetails.titleEnglish} />
						<ListItemText primary='Title Japanese:' secondary={animeDetails.titleJapanese} />
						<ListItemText primary='Type:' secondary={animeDetails.type} />
						<ListItemText primary='Status:' secondary={animeDetails.status} />
						<ListItemText primary='Rating:' secondary={animeDetails.rating} />
						<ListItemText primary='Source:' secondary={animeDetails.source} />
						<ListItemText primary='Season:' secondary={animeDetails.season} />
					</List>

					<List>
						<ListItemText primary='Airing:' secondary={animeDetails.airing ? 'Yes' : 'No'} />
						<ListItemText primary='Aired:' secondary={
							getYearsRange(animeDetails.aired.start, animeDetails.aired.end)
						} />
						<ListItemText className={styles.studios} primary='Studios:' secondary={
							animeDetails.studios.length ? animeDetails.studios.map(studio => (
								<span key={studio.id} className={styles.studio}>
									{studio.name}
								</span>
							)) : 'Unknown'
						} />
						<ListItemText className={styles.genres} primary='Genres:' secondary={
							animeDetails.genres.length ? animeDetails.genres.map(genre => (
								<span key={genre.id} className={styles.genre}>
									{genre.name}
								</span>
							)) : 'Unknown'
						} />
						<ListItemText primary='Description:' secondary={animeDetails.description} />
					</List>

				</Box>

				{animeDetails.trailerYoutubeId && (
					<YouTube
						className={styles.trailer}
						videoId={animeDetails.trailerYoutubeId ?? undefined}
						opts={opts}
					></YouTube>
				)}
			</Box>
		)
	);
};

export const AnimeDetails = memo(AnimeDetailsComponent);
