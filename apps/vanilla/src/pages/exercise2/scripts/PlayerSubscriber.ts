import { DiceAccumulatorPublisher } from './DiceAccumulatorPublisher';
import { Publisher } from './Publisher';
import { WINNING_POINTS } from './const';
import { Turn } from './models/Turn';
import { Player } from './models/Player';
import { Subscriber } from './models/Subscriber';

/** Player's status. */
export class PlayerSubscriber implements Subscriber<Turn> {

	/** Dice's results. */
	public readonly results = new DiceAccumulatorPublisher();

	/** Player is active. */
	public readonly isActive = new Publisher<boolean>();

	/** Player is winner. */
	public readonly isWinner = new Publisher<boolean>();

	/** @param player Player's information. */
	public constructor(public readonly player: Player) {}

	/**
	 * Update data.
	 * @param turn Turn information.
	 */
	public update(turn: Turn): void {
		if (turn.currentPlayerId === this.player.id) {
			this.results.next(turn.dice);
		}

		this.isActive.notify(turn.nextPlayerId === this.player.id);
		this.isWinner.notify(this.results.getScore() >= WINNING_POINTS);
	}
}
