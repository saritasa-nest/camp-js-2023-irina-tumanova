/** ISubscriber - interface for subscribers. */
export interface ISubscriber<T>{

	/** Function update subscriber. */
	update(data: T): void;
}

/** Data about who is walking. */
export interface ICurrentPlayerMoveData {

	/** Current player's index. */
	readonly currentPlayerId: number;

	/** Next player's index. */
	readonly nextPlayerId: number;
}

/** Data about who is walking. */
export interface IMoveData extends ICurrentPlayerMoveData {

	/** Number of the side of the dice that has fallen. */
	readonly diceSide: number;
}

/** Data to display the result. */
export interface IDisplayResultData{

	/** Player status. */
	readonly status: TDisplayPlayerStatus;

	/** Results data */
	readonly results?: number[];
}

/** Player status. */
export enum TDisplayPlayerStatus {
	Inactive = 'inactive',
	Active = 'active',
	Win = 'win',
}
