import { createAsyncThunk } from '@reduxjs/toolkit';

import { GenresService } from '../../api/services/genre';
import { GenreParams } from '@js-camp/core/models/genre/genre-params';

export const fetchGenres = createAsyncThunk('genres/fetch', (params: GenreParams) => GenresService.fetchGenres(params));
