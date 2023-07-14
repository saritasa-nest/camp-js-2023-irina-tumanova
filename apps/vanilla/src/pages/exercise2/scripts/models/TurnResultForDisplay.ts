/** Data to display the result. */
export interface TurnResultsForDisplay {

	/** Dice's results. */
	readonly results: readonly number[];

	/** Player is active. */
	readonly isActive?: boolean;

	/** Player is a winner. */
	readonly isWinner?: boolean;
}
