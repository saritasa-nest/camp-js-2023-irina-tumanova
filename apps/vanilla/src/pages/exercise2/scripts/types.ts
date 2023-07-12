/** Interface for subscribers. */
export interface ISubscriber<T>{

	/** Update subscriber. */
	readonly update: (message: T) => void;
}

/** Data about who is turn. */
export interface CurrentTurnOrder {

	/** Current player's index. */
	readonly currentPlayerId: number;

	/** Next player's index. */
	readonly nextPlayerId: number;
}

/** Data about a turn. */
export interface TurnData extends CurrentTurnOrder {

	/** Number on the dice. */
	readonly diceSide: number;
}

/** Data to display the result. */
export interface DisplayResultStatus{

	/** Player status. */
	readonly status: readonly EDisplayStatus[];

	/** Results. */
	readonly rollValues: readonly number[];
}

/** Player status. */
export enum EDisplayStatus {
	Active = 'result-item_active',
	Win = 'result-item_winning',
}

/** Data with references to html result elements. */
export interface ResultElementHtml {

	/** Result item container. */
	readonly resultHtml: HTMLElement;

	/** Result's score. */
	readonly resultScoreHtml: HTMLElement;

	/** Result's moves container html. */
	readonly resultMovesDataHtml: HTMLElement;
}
