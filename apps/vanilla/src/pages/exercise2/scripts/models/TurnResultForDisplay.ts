/** Data to display the result. */
export interface TurnResultsForDisplay {

	/** Turn's values. */
	readonly turnResults: readonly number[];

	/** Player is active. */
	readonly isActive?: boolean;

	/** Player is a winner. */
	readonly isWinner?: boolean;
}
