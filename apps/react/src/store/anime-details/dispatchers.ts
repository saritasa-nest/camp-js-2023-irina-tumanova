import { createAsyncThunk } from '@reduxjs/toolkit';

import { AnimeService } from '@js-camp/react/api/services/animeService';
import { Anime } from '@js-camp/core/models/anime/anime';

export const fetchAnimeDetails = createAsyncThunk(
	'animeDetails/fetch',
	(id: Anime['id']) => AnimeService.fetchAnimeDetails(id),
);
