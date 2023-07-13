import { DiceAccumulator } from './DiceAccumulator';
import { Publisher } from './Publisher';
import { WINNING_POINTS } from './const';
import { TurnResult, ISubscriber, IsActiveMessage, IsWinnerMessage } from './types';

/** Player's status. */
export class Player implements ISubscriber<TurnResult> {

	/** Turns results. */
	public results: DiceAccumulator;

	/** Player is active. */
	public isActive: Publisher<IsActiveMessage>;

	/** Player is winner. */
	public isWinner: Publisher<IsWinnerMessage>;

	/**
	 * @param playerIndex Player index.
	 */
	public constructor(public readonly playerIndex: number) {
		this.results = new DiceAccumulator();
		this.isActive = new Publisher();
		this.isWinner = new Publisher();
	}

	/**
	 * Update data.
	 * @param message Turn information.
	 */
	public update(message: TurnResult): void {
		if (message.currentPlayerIndex === this.playerIndex) {
			this.results.next(message.diceResult);
		}

		this.isActive.notify({ isActive: message.nextPlayerIndex === this.playerIndex });
		this.isWinner.notify({ isWinner: this.results.getScore() >= WINNING_POINTS });
	}
}
