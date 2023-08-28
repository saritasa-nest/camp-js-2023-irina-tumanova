import { Genre } from '@js-camp/core/models/genre/genre';

/** Genres state. */
export interface GenreDetailsState {

	/** Genre details. */
	readonly genreDetails: Genre | null;

	/** Error. */
	readonly error?: string;

	/** Whether the genres are loading or not. */
	readonly isLoading: boolean;
}

export const initialState: GenreDetailsState = {
	isLoading: false,
	genreDetails: null,
};
