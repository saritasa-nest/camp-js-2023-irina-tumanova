import { Studio } from '@js-camp/core/models/studio/studio';

/** Studio details state. */
export interface StudioDetailsState {

	/** Studio details. */
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
