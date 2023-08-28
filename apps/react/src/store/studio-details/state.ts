import { Studio } from '@js-camp/core/models/studio/studio';

/** Genres state. */
export interface StudioDetailsState {

	/** Genre details. */
	readonly studioDetails: Studio | null;

	/** Error. */
	readonly error?: string;

	/** Whether the genres are loading or not. */
	readonly isLoading: boolean;
}

export const initialState: StudioDetailsState = {
	isLoading: false,
	studioDetails: null,
};
