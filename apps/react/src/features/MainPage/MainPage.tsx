import { FC, useEffect } from 'react';
import { Card, CardContent, CardMedia, Container, Rating, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { typedMemo } from '@js-camp/react/utils/typedMemo';
import { fetchRecommendedAnime } from '@js-camp/react/store/recommended-anime/dispatchers';
import { PaginationParams } from '@js-camp/core/models/pagination-params';
import {
	selectIsRecommendedAnimeLoading,
	selectRecommendedAnime,
} from '@js-camp/react/store/recommended-anime/selectors';
import { AppShadowLoader } from '@js-camp/react/components/AppShadowLoader';
import { Anime } from '@js-camp/core/models/anime/anime';

import styles from './MainPage.module.css';

const paginationParams: PaginationParams = new PaginationParams({ pageNumber: 0, pageSize: 45 });

const MainPaigComponent: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const isLoading = useAppSelector(selectIsRecommendedAnimeLoading);
	const anime = useAppSelector(selectRecommendedAnime);

	useEffect(() => {
		dispatch(fetchRecommendedAnime(paginationParams));
	}, []);

	if (isLoading) {
		return <AppShadowLoader />;
	}

	const handleNavigateToDetails = (id: Anime['id']) => {
		navigate(`anime/${id}`);
	};

	return (
		<Container sx={{ display: 'flex' }} className={styles.mainPageContainer}>
			{anime.map(item => <Card className={styles.animeCard} onClick={() => handleNavigateToDetails(item.id)}>
				<CardMedia
					sx={{ height: 140 }}
					image={item.imageUrl}
					title={item.titleEnglish}
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{item.titleEnglish}
					</Typography>
					<Typography gutterBottom variant="body2" color="text.secondary">
						{item.titleJapanese}
					</Typography>
					<Rating name="read-only" className={styles.bla} value={item.score} readOnly />
				</CardContent>
			</Card>)};
		</Container>
	);
};

export const MainPage = typedMemo(MainPaigComponent);
