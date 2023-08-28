import { FC, useEffect } from 'react';
import { Box, Container, List, ListItemText } from '@mui/material';
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
			{anime.map(item => <Box onClick={() => handleNavigateToDetails(item.id)} className={styles.animeCard}>
				<img className={styles.animeCardImage} src={item.imageUrl} alt={item.titleEnglish} />
				<List>
					{item.titleEnglish && <ListItemText primary='English title:' secondary={item.titleEnglish} />}
					{item.titleJapanese && <ListItemText primary='Japanese title:' secondary={item.titleJapanese} />}
				</List>
			</Box>)}
		</Container>
	);
};

export const MainPage = typedMemo(MainPaigComponent);
