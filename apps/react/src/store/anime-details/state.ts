import { AnimeDetails } from '@js-camp/core/models/anime/anime-details';

/** Anime details state. */
export interface AnimeState {

	/** Anime details. */
	readonly animeDetails: AnimeDetails | null;

	/** Error. */
	readonly error?: string;

	/** Whether anime details are loading or not. */
	readonly isLoading: boolean;
}

export const initialState: AnimeState = {
	isLoading: false,
	animeDetails: null,
};
