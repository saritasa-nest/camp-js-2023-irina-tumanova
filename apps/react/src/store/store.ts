import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { genresSlice } from './genre/slice';
import { authSlice } from './auth/slice';
import { userSlice } from './user/slice';
import { genreDetailsSlice } from './genre-details/slice';
import { animeSlice } from './anime/slice';
import { studiosSlice } from './studio/slice';
import { recommendedAnimeSlice } from './recommended-anime/slice';

export const store = configureStore({
	reducer: {
		genres: genresSlice.reducer,
		genreDetails: genreDetailsSlice.reducer,
		auth: authSlice.reducer,
		user: userSlice.reducer,
		anime: animeSlice.reducer,
		studios: studiosSlice.reducer,
		recommendedAnime: recommendedAnimeSlice.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			// We need to disable this check to allow ES6 classes in Redux.
			// You can find more info about this middleware in docs:
			// https://redux-toolkit.js.org/api/serializabilityMiddleware
			serializableCheck: false,
		}),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

/** Typed `useDispatch` hook. */
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
