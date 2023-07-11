import { Publisher } from './Publisher';
import { IDisplayStatusData, IMoveData, ISubscriber, TDisplayStatus } from './types';

/** Game result class. */
export class GameStatus extends Publisher<IDisplayStatusData> implements ISubscriber<IMoveData> {
	/** Players count. */
	private results: number[] = [];

	/** Function update data.
	 * @param data - Game move data.
	 */
	public update(data: IMoveData): void {
		this.results = [...this.results, data.diceSide];

		const notifyData = { status: TDisplayStatus.Inactive, results: this.results };
		this.notify(notifyData);
	}
}
