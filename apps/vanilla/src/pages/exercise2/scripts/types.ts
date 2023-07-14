/** Interface for subscribers. */
export interface ISubscriber<T>{

	/** Update subscriber. */
	readonly update: (message: T) => void;
}

/** Data about who is turn. */
export interface CurrentTurnOrder {

	/** Current player's index. */
	readonly currentPlayerIndex: number;

	/** Next player's index. */
	readonly nextPlayerIndex: number;
}

/** Data about a turn. */
export interface TurnInfo extends CurrentTurnOrder {

	/** Number on the dice. */
	readonly diceResult: number;
}

/** Data to display the result. */
export interface TurnResultsForDisplay {

	/** Turn's values. */
	readonly turnResults: readonly number[];

	/** Player is active. */
	readonly isActive?: boolean;

	/** Player is a winner. */
	readonly isWinner?: boolean;
}
