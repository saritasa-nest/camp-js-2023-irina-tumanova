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
export interface DisplayResult {

	/** Player status. */
	readonly status: readonly PlayerStatus[];

	/** Turn's values. */
	readonly turnValues: readonly number[];
}

/** Player status. */
export enum PlayerStatus {
	Active = 'result-item_active',
	Win = 'result-item_winning',
}
