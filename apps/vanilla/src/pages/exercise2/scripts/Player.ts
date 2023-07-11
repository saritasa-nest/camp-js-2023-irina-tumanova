import { Publisher } from './Publisher';
import { IDisplayResultData, IMoveData, ISubscriber, TDisplayPlayerStatus } from './types';

/** Player result class. */
export class Player extends Publisher<IDisplayResultData> implements ISubscriber<IMoveData> {
	/** Players count. */
	private results: number[] = [];

	/** Player score. */
	private score = 0;

	/** Required number of points. */
	private readonly requiredPointsNumber = 21;

	public constructor(public readonly playerId: number) {
		super();
	}

	/** Function update data.
	 * @param data - Game move data.
	 */
	public update(data: IMoveData): void {
		if (data.currentPlayerId === this.playerId) {
			this.score += data.diceSide;
			this.results = [...this.results, data.diceSide];
		}

		let status: TDisplayPlayerStatus = TDisplayPlayerStatus.Inactive;
		if (this.score >= this.requiredPointsNumber) {
			status = TDisplayPlayerStatus.Win;
		} else if (data.nextPlayerId === this.playerId) {
			status = TDisplayPlayerStatus.Active;
		}

		const notifyData: IDisplayResultData = {
			status,
			results: this.playerId === data.currentPlayerId ?
				this.results :
				undefined,
		};

		this.notify(notifyData);
	}
}
