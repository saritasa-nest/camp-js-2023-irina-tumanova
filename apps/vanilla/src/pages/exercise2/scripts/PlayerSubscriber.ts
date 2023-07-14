import { DiceAccumulatorPublisher } from './DiceAccumulatorPublisher';
import { Publisher } from './Publisher';
import { WINNING_POINTS } from './const';
import { Turn } from './models/Turn';
import { Player } from './models/Player';
import { Subscriber } from './models/Subscriber';

/** Player's status. */
export class PlayerSubscriber implements Subscriber<Turn> {

	/** Turns results. */
	public readonly results = new DiceAccumulatorPublisher();

	/** Player is active. */
	public readonly isActive = new Publisher<boolean>();

	/** Player is winner. */
	public readonly isWinner = new Publisher<boolean>();

	/**
	 * @param playerInfo Player info.
	 */
	public constructor(public readonly playerInfo: Player) {}

	/**
	 * Update data.
	 * @param message Turn information.
	 */
	public update(message: Turn): void {
		if (message.currentPlayerIndex === this.playerInfo.index) {
			this.results.next(message.dice);
		}

		this.isActive.notify(message.nextPlayerIndex === this.playerInfo.index);
		this.isWinner.notify(this.results.getScore() >= WINNING_POINTS);
	}
}
