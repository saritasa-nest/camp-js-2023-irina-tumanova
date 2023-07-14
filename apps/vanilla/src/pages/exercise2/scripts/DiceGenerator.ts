import { Publisher } from './Publisher';
import { CurrentTurnOrder, ISubscriber, TurnInfo } from './types';
import { generateRandomNumber } from './utils';

/** Random dice generator. */
export class DiceGenerator extends Publisher<TurnInfo> implements ISubscriber<CurrentTurnOrder> {

	/**
	 * Update data.
	 * @param message Player information.
	 */
	public update(message: CurrentTurnOrder): void {
		this.notify({ ...message, diceResult: generateRandomNumber(1, 6) });
	}
}
