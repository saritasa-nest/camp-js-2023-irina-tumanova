import { FC, memo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, List, ListItem } from '@mui/material';
import YouTube, { YouTubeProps } from 'react-youtube';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';

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
				<Box className={styles['details-view']}>
					<Box className={styles['image-wrapper']}>
						<img className={styles.img} src={animeDetails.imageUrl} alt="Anime cover image" />
						<button type="button" onClick={handleOpen} className="plain-icon-btn">
							<OpenInFullIcon />
						</button>
					</Box>
					<ImageDialog open={open} onClose={handleClose} imageSrc={animeDetails.imageUrl} />
					{animeDetails.trailerYoutubeId && (
						<Box>
							<YouTube videoId={animeDetails.trailerYoutubeId ?? undefined} opts={opts}></YouTube>
						</Box>
					)}
				</Box>
				<Box className={styles['details-text']}>
					<List>
						{
							animeDetails.titleEnglish &&
							<ListItem className={styles.titleEng}>{animeDetails.titleEnglish}</ListItem>
						}
						<ListItem>{animeDetails.titleJapanese}</ListItem>
						<ListItem>Type: {animeDetails.type}</ListItem>
						<ListItem>Status: {animeDetails.status}</ListItem>
						<ListItem>Rating: {animeDetails.rating}</ListItem>
						<ListItem>Source: {animeDetails.source}</ListItem>
						<ListItem>Season: {animeDetails.season}</ListItem>
						<ListItem>Airing: {animeDetails.airing ? 'Yes' : 'No'}</ListItem>
						<ListItem>Aired: {getYearsRange(animeDetails.aired.start, animeDetails.aired.end)}</ListItem>
						<ListItem>
							Studios:
							{animeDetails.studios.length ? animeDetails.studios.map(el => (
								<span key={el.id} className={styles.item}>
									{el.name}
								</span>
							)) : ' Unknown'}
						</ListItem>
						<ListItem>
							Genres:
							{animeDetails.genres.length ? animeDetails.genres.map(el => (
								<span key={el.id} className={styles.item}>
									{el.name}
								</span>
							)) : ' Unknown'}
						</ListItem>
						<ListItem>Description: {animeDetails.description}</ListItem>
					</List>
				</Box>
			</Box>
		)
	);
};

export const AnimeDetails = memo(AnimeDetailsComponent);
