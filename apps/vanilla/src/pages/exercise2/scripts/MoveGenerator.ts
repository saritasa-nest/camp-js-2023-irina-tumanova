import { Publisher } from './Publisher';
import { ICurrentPlayerMoveData } from './types';

/** Next move generator. */
export class MoveGenerator extends Publisher<ICurrentPlayerMoveData> {

	/** Players count. */
	private playersIds: number[] = [];

	/** Current player's index. */
	private currentPlayerIndex = 0;

	public constructor() {
		super();

		this.move = this.move.bind(this);
	}

	/** Function roll button. */
	public move(): void {
		const nextPlayerIndex = (this.currentPlayerIndex + 1) % this.playersIds.length;
		const nextPlayerId = this.playersIds[nextPlayerIndex];

		const notifyData = { currentPlayerId: this.playersIds[this.currentPlayerIndex], nextPlayerId };
		this.notify(notifyData);

		this.currentPlayerIndex = nextPlayerIndex;
	}

	/** Function update players.
	 * @param playerIds - Player's ids.
	 */
	public updatePlayers(playerIds: number[]): void {
		this.playersIds = playerIds;
		console.log(playerIds);
	}
}
