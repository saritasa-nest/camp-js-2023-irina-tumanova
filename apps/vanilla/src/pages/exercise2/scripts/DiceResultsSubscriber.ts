import { DiceAccumulatorPublisher } from './DiceAccumulatorPublisher';
import { Subscriber } from './models/Subscriber';
import { Turn } from './models/Turn';

/** Common dice results. */
export class DiceResultsSubscriber implements Subscriber<Turn> {

	/** Dice's results. */
	public readonly results = new DiceAccumulatorPublisher();

	/**
	 * Update data.
	 * @param message Turn information.
	 */
	public update(message: Turn): void {
		this.results.next(message.dice);
	}
}
