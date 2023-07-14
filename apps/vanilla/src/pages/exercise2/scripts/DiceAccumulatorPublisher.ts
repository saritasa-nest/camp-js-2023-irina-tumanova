import { Publisher } from './Publisher';

/** Dice accumulator. */
export class DiceAccumulatorPublisher extends Publisher<number[]> {

	/** Turns results. */
	private results: readonly number[] = [];

	/**
	 * Get next dice result.
	 * @param diceResult Dice result.
	 */
	public next(diceResult: number): void {
		const results = [...this.results, diceResult];
		this.results = results;

		this.notify(results);
	}

	/** Get results summary. */
	public getScore(): number {
		return this.results.reduce((prev, next) => prev + next, 0);
	}
}
