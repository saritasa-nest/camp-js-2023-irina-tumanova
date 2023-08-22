import { createAsyncThunk } from '@reduxjs/toolkit';

import { AnimeService } from '@js-camp/react/api/services/animeService';
import { AnimeParams } from '@js-camp/core/models/anime/anime-params';

export const fetchAnime = createAsyncThunk(
	'anime/fetch',
	(params: AnimeParams) => AnimeService.fetchAnime(params),
);
