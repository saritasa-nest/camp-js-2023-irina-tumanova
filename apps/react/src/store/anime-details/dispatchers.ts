import { createAsyncThunk } from '@reduxjs/toolkit';

import { AnimeService } from '@js-camp/react/api/services/animeService';
import { Anime } from '@js-camp/core/models/anime/anime';

interface AnimeScoreValues {

	/** ID. */
	readonly id: Anime['id'];

	/** New anime score. */
	readonly score: number | null;
}

export const fetchAnimeDetails = createAsyncThunk(
	'animeDetails/fetch',
	(id: Anime['id']) => AnimeService.fetchAnimeDetails(id),
);

export const changeAnimeDetailsScore = createAsyncThunk(
	'animeDetails/changeScore',
	async(animeScoreValues: AnimeScoreValues) => {
		await AnimeService.changeAnimeScore(animeScoreValues.id, animeScoreValues.score);
		return AnimeService.fetchAnimeDetails(animeScoreValues.id);
	},
);
