import { Publisher } from './Publisher';
import { TurnOrder } from './models/TurnOrder';

/** Next turn generator. */
export class TurnGeneratorPublisher extends Publisher<TurnOrder> {

	/** Players count. */
	public playersCount = 0;

	/** Current player's index. */
	private currentPlayerId = 0;

	/** Make a turn. */
	public turn(): void {
		const nextPlayerId = (this.currentPlayerId + 1) % this.playersCount;

		this.notify({ currentPlayerId: this.currentPlayerId, nextPlayerId });

		this.currentPlayerId = nextPlayerId;
	}
}
