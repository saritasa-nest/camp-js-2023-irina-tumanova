import { Publisher } from './Publisher';
import { DisplayResult, TurnData, ISubscriber } from './types';

/** Game's status. */
export class GameStatus extends Publisher<DisplayResult> implements ISubscriber<TurnData> {

	/** Dice roll values. */
	private rollValues: readonly number[] = [];

	/**
	 * Update data.
	 * @param message Turn information.
	 */
	public update(message: TurnData): void {
		this.rollValues = [...this.rollValues, message.diceSide];

		this.notify({ status: [], turnValues: this.rollValues });
	}
}
