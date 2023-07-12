import { Publisher } from './Publisher';
import { DisplayResultStatus, TurnData, ISubscriber } from './types';

/** Game's status. */
export class GameStatus extends Publisher<DisplayResultStatus> implements ISubscriber<TurnData> {

	/** Dice roll values. */
	private rollValues: number[] = [];

	/**
	 * Update data.
	 * @param message Turn information.
	 */
	public update(message: TurnData): void {
		this.rollValues = [...this.rollValues, message.diceSide];

		this.notify({ status: [], rollValues: this.rollValues });
	}
}
