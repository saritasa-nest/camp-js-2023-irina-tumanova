import { Publisher } from './Publisher';
import { WINNING_POINTS } from './const';
import { TurnResultsForDisplay, TurnResult, ISubscriber } from './types';

/** Player's status. */
export class Player extends Publisher<TurnResultsForDisplay> implements ISubscriber<TurnResult> {

	/** Turns results. */
	private turnResults: readonly number[] = [];

	/**
	 * @param playerIndex Player index.
	 */
	public constructor(public readonly playerIndex: number) {
		super();
	}

	/**
	 * Update data.
	 * @param message Turn information.
	 */
	public update(message: TurnResult): void {
		let score = this.turnResults.reduce((prev, next) => prev + next, 0);
		if (message.currentPlayerIndex === this.playerIndex) {
			score += message.diceResult;
			this.turnResults = [...this.turnResults, message.diceResult];
		}

		const notifyData: TurnResultsForDisplay = {
			isActive: message.nextPlayerIndex === this.playerIndex,
			isWinner: score >= WINNING_POINTS,
			turnResults: this.turnResults,
		};

		this.notify(notifyData);
	}
}
