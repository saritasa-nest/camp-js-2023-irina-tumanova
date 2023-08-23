import { Anime } from '@js-camp/core/models/anime/anime';

/** Genres state. */
export interface AnimeState {

	/** Genres list. */
	readonly anime: Anime[];

	/** Error. */
	readonly error?: string;

	/** Whether the genres are loading or not. */
	readonly isLoading: boolean;
}

export const initialState: AnimeState = {
	isLoading: false,
	anime: [],
};
