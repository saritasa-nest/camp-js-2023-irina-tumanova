/** Data about who is turn. */
export interface TurnOrder {

	/** Current player's index. */
	readonly currentPlayerIndex: number;

	/** Next player's index. */
	readonly nextPlayerIndex: number;
}
