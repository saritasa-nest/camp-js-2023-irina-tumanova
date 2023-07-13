import { Publisher } from './Publisher';
import { ResultsMessage } from './types';

/** Dice accumulator. */
export class DiceAccumulator extends Publisher<ResultsMessage> {

	/** Turns results. */
	private results: number[] = [];

	/**
	 * Get next dice result.
	 * @param diceResult Dice result.
	 */
	public next(diceResult: number): void {
		this.results = [...this.results, diceResult];

		this.notify({ results: this.results });
	}

	/** Get results summary. */
	public getScore(): number {
		return this.results.reduce((prev, next) => prev + next, 0);
	}
}
