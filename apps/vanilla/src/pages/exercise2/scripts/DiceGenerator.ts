import { Publisher } from './Publisher';
import { CurrentTurnOrder, ISubscriber, TurnData } from './types';
import { generateRandomNumber } from './utils';

/** Random dice generator. */
export class DiceGenerator extends Publisher<TurnData> implements ISubscriber<CurrentTurnOrder> {

	/**
	 * Update data.
	 * @param message Player information.
	 */
	public update(message: CurrentTurnOrder): void {
		this.notify({ ...message, diceSide: generateRandomNumber(1, 6) });
	}
}
