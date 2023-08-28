import { createAsyncThunk } from '@reduxjs/toolkit';

import { AnimeService } from '@js-camp/react/api/services/animeService';
import { PaginationParams } from '@js-camp/core/models/pagination-params';

export const fetchRecommendedAnime = createAsyncThunk(
	'recommendedAnime/fetch',
	(params: PaginationParams) => AnimeService.fetchRecommendedAnime(params),
);
