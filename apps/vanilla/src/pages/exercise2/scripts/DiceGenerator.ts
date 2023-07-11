import { Publisher } from './Publisher';
import { ICurrentPlayerMoveData, ISubscriber, IMoveData } from './types';

/** Random dice generator. */
export class DiceGenerator extends Publisher<IMoveData> implements ISubscriber<ICurrentPlayerMoveData> {

	/** Function update data.
	 * @param data - Walking player data.
	 */
	public update(data: ICurrentPlayerMoveData): void {
		const diceSide = this.generateRandomNumber(1, 7);

		const notifyData = { ...data, diceSide };
		this.notify(notifyData);
	}

	/** Function generate random number.
	 * @param min - Minimal number.
	 * @param max - Maximum number.
	 */
	public generateRandomNumber(min: number, max: number): number {
		const rand = min + Math.random() * (max - min);
		return Math.floor(rand);
	}
}
