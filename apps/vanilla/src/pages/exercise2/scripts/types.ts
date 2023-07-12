/** ISubscriber - interface for subscribers. */
export interface ISubscriber<T>{

	/** Function update subscriber. */
	readonly update: (data: T) => void;
}

/** Data about who is walking. */
export interface ICurrentPlayerMoveData {

	/** Current player's index. */
	readonly currentPlayerId: number;

	/** Next player's index. */
	readonly nextPlayerId: number;
}

/** Data about who is walking. */
export interface IMoveData extends ICurrentPlayerMoveData {

	/** Number of the side of the dice that has fallen. */
	readonly diceSide: number;
}

/** Data to display the result. */
export interface IDisplayStatusData{

	/** Player status. */
	readonly status: readonly TDisplayStatus[];

	/** Results data. */
	readonly results: readonly number[];
}

/** Player status. */
export enum TDisplayStatus {
	Active = 'result-item_active',
	Win = 'result-item_winning',
}

/** Data with references to html result elements. */
export interface IResultElementHtml {

	/** Result item container. */
	readonly resultHtml: HTMLElement;

	/** Result's score. */
	readonly resultScoreHtml: HTMLElement;

	/** Result's moves container html. */
	readonly resultMovesDataHtml: HTMLElement;
}
