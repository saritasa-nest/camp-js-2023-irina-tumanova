import { createAsyncThunk } from '@reduxjs/toolkit';

import { StudiosService } from '@js-camp/react/api/services/studioService';

export const fetchStudios = createAsyncThunk(
	'studios/fetch',
	() => StudiosService.fetchStudios(),
);
