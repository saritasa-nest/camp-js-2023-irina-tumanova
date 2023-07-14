import { TurnOrder } from './TurnOrder';

/** Data about a turn. */
export interface Turn extends TurnOrder {

	/** Number on the dice. */
	readonly dice: number;
}
