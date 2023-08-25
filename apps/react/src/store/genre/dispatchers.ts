import { createAsyncThunk } from '@reduxjs/toolkit';

import { GenreParams } from '@js-camp/core/models/genre/genre-params';

import { GenresService } from '../../api/services/genre';

export const fetchGenres = createAsyncThunk('genres/fetch', (params: GenreParams) => GenresService.fetchGenres(params));
