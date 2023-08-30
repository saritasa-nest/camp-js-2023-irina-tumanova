import { createAsyncThunk } from '@reduxjs/toolkit';

import { StudiosService } from '@js-camp/react/api/services/studioService';
import { StudioParams } from '@js-camp/core/models/studio/studio-params';

export const fetchStudios = createAsyncThunk(
	'studios/fetch',
	(params: StudioParams) => StudiosService.fetchStudios(params),
);
