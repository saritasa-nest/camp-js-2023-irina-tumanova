import { Studio } from '@js-camp/core/models/studio/studio';

/** Studios state. */
export interface StudiosState {

	/** Studios list. */
	readonly studios: Studio[];

	/** Error. */
	readonly error?: string;

	/** Whether studios are loading or not. */
	readonly isLoading: boolean;
}

export const initialState: StudiosState = {
	isLoading: true,
	studios: [],
};
