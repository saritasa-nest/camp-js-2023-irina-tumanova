import { Publisher } from './Publisher';
import { WINNING_POINTS } from './const';
import { DisplayResultStatus, TurnData, ISubscriber, EDisplayStatus } from './types';

/** Player's status. */
export class PlayerStatus extends Publisher<DisplayResultStatus> implements ISubscriber<TurnData> {

	/** Dice roll values. */
	private rollValues: number[] = [];

	/**
	 * @param playerId Player id.
	 */
	public constructor(public readonly playerId: number) {
		super();
	}

	/**
	 * Update data.
	 * @param message Turn information.
	 */
	public update(message: TurnData): void {
		let score = this.rollValues.reduce((prev, next) => prev + next, 0);
		if (message.currentPlayerId === this.playerId) {
			score += message.diceSide;
			this.rollValues = [...this.rollValues, message.diceSide];
		}

		const notifyData: DisplayResultStatus = {
			status: this.getPlayerStatus(score, message.nextPlayerId === this.playerId),
			rollValues: this.rollValues,
		};

		this.notify(notifyData);
	}

	/**
	 * Get player status.
	 * @param isActive Is the user active (turning now).
	 * @param score Player score.
	 */
	public getPlayerStatus(score: number, isActive: boolean): EDisplayStatus[] {
		const status: EDisplayStatus[] = [];
		if (score >= WINNING_POINTS) {
			status.push(EDisplayStatus.Win);
		}

		if (isActive) {
			status.push(EDisplayStatus.Active);
		}

		return status;
	}
}
