import { createAsyncThunk } from '@reduxjs/toolkit';

import { GenresService } from '../../api/services/genre';

export const fetchGenreDetails = createAsyncThunk('genreDetails/fetch', (id: number) =>
	GenresService.fetchGenreDetails(id));
