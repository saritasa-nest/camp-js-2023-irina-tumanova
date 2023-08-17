import { StudiosService } from '@js-camp/react/api/services/studioService';

import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchStudios = createAsyncThunk(
	'studios/fetch',
	() => StudiosService.fetchStudios(),
);
