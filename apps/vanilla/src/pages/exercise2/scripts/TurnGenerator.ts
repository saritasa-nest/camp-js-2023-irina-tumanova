import { Publisher } from './Publisher';
import { ICurrentPlayerMoveData } from './types';

/** Next move generator. */
export class TurnGenerator extends Publisher<ICurrentPlayerMoveData> {

	/** Players count. */
	private playersIds: number[] = [1, 2];

	/** Current player's index. */
	private currentPlayerIndex = 0;

	public constructor() {
		super();

		this.turn = this.turn.bind(this);
	}

	/** Function roll button. */
	public turn(): void {
		const nextPlayerIndex = (this.currentPlayerIndex + 1) % this.playersIds.length;
		const nextPlayerId = this.playersIds[nextPlayerIndex];

		const notifyData = { currentPlayerId: this.playersIds[this.currentPlayerIndex], nextPlayerId };
		this.notify(notifyData);

		this.currentPlayerIndex = nextPlayerIndex;
	}
}
