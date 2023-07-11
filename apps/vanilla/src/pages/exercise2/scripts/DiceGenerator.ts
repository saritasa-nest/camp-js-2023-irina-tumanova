import { Publisher } from './Publisher';
import { ICurrentPlayerMoveData, ISubscriber, IMoveData } from './types';
import { generateRandomNumber } from './utils';

/** Random dice generator. */
export class DiceGenerator extends Publisher<IMoveData> implements ISubscriber<ICurrentPlayerMoveData> {

	/**
	 * Update data.
	 * @param data - Walking player data.
	 */
	public update(data: ICurrentPlayerMoveData): void {
		const minResultValue = 1;
		const maxResultValue = 6;
		const diceSide = generateRandomNumber(minResultValue, maxResultValue);

		const notifyData = { ...data, diceSide };
		this.notify(notifyData);
	}
}
