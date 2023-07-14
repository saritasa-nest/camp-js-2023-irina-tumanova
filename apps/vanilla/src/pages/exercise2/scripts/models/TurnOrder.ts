import { Player } from './Player';

/** Data about who is turn. */
export interface TurnOrder {

	/** Current player's index. */
	readonly currentPlayerId: Player['id'];

	/** Next player's index. */
	readonly nextPlayerId: Player['id'];
}
