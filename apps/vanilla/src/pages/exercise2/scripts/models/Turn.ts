import { TurnOrder } from './TurnOrder';

/** Full turn data: turn order and number on the dice. */
export interface Turn extends TurnOrder {

	/** Number on the dice. */
	readonly dice: number;
}
