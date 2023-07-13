import { DiceAccumulator } from './DiceAccumulator';
import { ISubscriber, TurnResult } from './types';

/** Common dice results. */
export class DiceResults implements ISubscriber<TurnResult> {

	/** Turns results. */
	public readonly results: DiceAccumulator;

	public constructor() {
		this.results = new DiceAccumulator();
	}

	/**
	 * Update data.
	 * @param message Turn information.
	 */
	public update(message: TurnResult): void {
		this.results.next(message.diceResult);
	}
}
