import { Publisher } from './Publisher';
import { IDisplayResultData, IMoveData, ISubscriber, TDisplayPlayerStatus } from './types';

/** Game result class. */
export class GameStatus extends Publisher<IDisplayResultData> implements ISubscriber<IMoveData> {
	/** Players count. */
	private results: number[] = [];

	/** Function update data.
	 * @param data - Game move data.
	 */
	public update(data: IMoveData): void {
		this.results = [...this.results, data.diceSide];

		const notifyData = { status: TDisplayPlayerStatus.Inactive, results: this.results };
		this.notify(notifyData);
	}
}
