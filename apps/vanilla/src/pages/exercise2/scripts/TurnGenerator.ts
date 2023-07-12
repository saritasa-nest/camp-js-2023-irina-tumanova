import { Publisher } from './Publisher';
import { CurrentTurnOrder } from './types';

/** Next turn generator. */
export class TurnGenerator extends Publisher<CurrentTurnOrder> {

	/** Players count. */
	private playersIds: readonly number[] = [];

	/** Current player's index. */
	private currentPlayerIndex = 0;

	public constructor() {
		super();

		// This method is used in GameController
		this.turn = this.turn.bind(this);
	}

	/** Make a turn. */
	public turn(): void {
		const nextPlayerIndex = (this.currentPlayerIndex + 1) % this.playersIds.length;
		const nextPlayerId = this.playersIds[nextPlayerIndex];

		this.notify({ currentPlayerId: this.playersIds[this.currentPlayerIndex], nextPlayerId });

		this.currentPlayerIndex = nextPlayerIndex;
	}

	/**
	 * Update players.
	 * @param playerIds Player's ids.
	 */
	public updatePlayers(playerIds: readonly number[]): void {
		this.playersIds = playerIds;
	}
}
