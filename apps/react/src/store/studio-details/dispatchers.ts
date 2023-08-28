import { createAsyncThunk } from '@reduxjs/toolkit';

import { StudiosService } from '@js-camp/react/api/services/studioService';

export const fetchStudioDetails = createAsyncThunk('studioDetails/fetch', (id: number) =>
	StudiosService.fetchStudioDetails(id));
