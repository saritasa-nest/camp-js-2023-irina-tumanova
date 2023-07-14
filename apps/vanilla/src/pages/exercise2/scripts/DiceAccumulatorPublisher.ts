import { Publisher } from './Publisher';

/** Dice accumulator. */
export class DiceAccumulatorPublisher extends Publisher<number[]> {

	/** Dice's results. */
	private results: readonly number[] = [];

	/**
	 * Get next dice's result.
	 * @param dice Dice result.
	 */
	public next(dice: number): void {
		const results = [...this.results, dice];
		this.results = results;

		this.notify(results);
	}

	/** Get results summary. */
	public getScore(): number {
		return this.results.reduce((prev, next) => prev + next, 0);
	}
}
