import { Publisher } from './Publisher';
import { TurnResultsForDisplay, TurnResult, ISubscriber } from './types';

/** Game's status. */
export class Game extends Publisher<TurnResultsForDisplay> implements ISubscriber<TurnResult> {

	/** Turns results. */
	private turnResults: readonly number[] = [];

	/**
	 * Update data.
	 * @param message Turn information.
	 */
	public update(message: TurnResult): void {
		this.turnResults = [...this.turnResults, message.diceResult];

		this.notify({ turnResults: this.turnResults });
	}
}
