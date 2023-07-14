import { DiceAccumulator } from './DiceAccumulator';
import { ISubscriber, TurnInfo } from './types';

/** Common dice results. */
export class DiceResults implements ISubscriber<TurnInfo> {

	/** Turns results. */
	public readonly results = new DiceAccumulator();

	/**
	 * Update data.
	 * @param message Turn information.
	 */
	public update(message: TurnInfo): void {
		this.results.next(message.diceResult);
	}
}
