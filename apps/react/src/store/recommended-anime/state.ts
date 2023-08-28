import { Anime } from '@js-camp/core/models/anime/anime';

/** Recommended anime state. */
export interface RecommendedAnimeState {

	/** Anime list. */
	readonly anime: Anime[];

	/** Error. */
	readonly error?: string;

	/** Whether the genres are loading or not. */
	readonly isLoading: boolean;
}

export const initialState: RecommendedAnimeState = {
	isLoading: false,
	anime: [],
};
