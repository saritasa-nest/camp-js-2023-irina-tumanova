import { Anime } from '@js-camp/core/models/anime/anime';

/** Anime state. */
export interface AnimeState {

	/** Anime list. */
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
