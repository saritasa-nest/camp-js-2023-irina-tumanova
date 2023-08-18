import { createAsyncThunk } from '@reduxjs/toolkit';
import { PaginationParams } from '@js-camp/core/models/pagination-params';

import { GenresService } from '../../api/services/genre';

export const fetchGenres = createAsyncThunk('genres/fetch', (params: PaginationParams) =>
	GenresService.fetchGenres(params));
