import { DiceAccumulator } from './DiceAccumulator';
import { Publisher } from './Publisher';
import { WINNING_POINTS } from './const';
import { TurnInfo, ISubscriber } from './types';

/** Player's status. */
export class Player implements ISubscriber<TurnInfo> {

	/** Turns results. */
	public readonly results = new DiceAccumulator();

	/** Player is active. */
	public readonly isActive = new Publisher<boolean>();

	/** Player is winner. */
	public readonly isWinner = new Publisher<boolean>();

	/**
	 * @param playerIndex Player index.
	 */
	public constructor(public readonly playerIndex: number) {}

	/**
	 * Update data.
	 * @param message Turn information.
	 */
	public update(message: TurnInfo): void {
		if (message.currentPlayerIndex === this.playerIndex) {
			this.results.next(message.diceResult);
		}

		this.isActive.notify(message.nextPlayerIndex === this.playerIndex);
		this.isWinner.notify(this.results.getScore() >= WINNING_POINTS);
	}
}
