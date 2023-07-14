import { Publisher } from './Publisher';
import { TurnOrder } from './models/TurnOrder';
import { Turn } from './models/Turn';
import { Subscriber } from './models/Subscriber';
import { generateRandomNumber } from './utils/generateRandomNumber';

/** Random dice generator. */
export class DiceGeneratorObserver extends Publisher<Turn> implements Subscriber<TurnOrder> {

	/**
	 * Update data.
	 * @param message Player information.
	 */
	public update(message: TurnOrder): void {
		this.notify({ ...message, dice: generateRandomNumber(1, 6) });
	}
}
