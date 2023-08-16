import { createAsyncThunk } from '@reduxjs/toolkit';

import { GenresService } from '../../api/services/genre';

export const fetchGenres = createAsyncThunk(
	'genres/fetch',
	() => GenresService.fetchGenres(),
);
