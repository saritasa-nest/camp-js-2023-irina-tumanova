import { Publisher } from './Publisher';
import { CurrentTurnOrder } from './types';

/** Next turn generator. */
export class TurnGenerator extends Publisher<CurrentTurnOrder> {

	/** Players count. */
	public playersCount = 0;

	/** Current player's index. */
	private currentPlayerIndex = 0;

	/** Make a turn. */
	public turn(): void {
		const nextPlayerIndex = (this.currentPlayerIndex + 1) % this.playersCount;

		this.notify({ currentPlayerIndex: this.currentPlayerIndex, nextPlayerIndex });

		this.currentPlayerIndex = nextPlayerIndex;
	}
}
