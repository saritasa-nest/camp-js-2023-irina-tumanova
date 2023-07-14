import { Subscriber } from '../models/Subscriber';

/** Result block display class. */
export class ResultTurnsComponent implements Subscriber<number[]> {

	/** Results's turns container. */
	public resultsContainer: HTMLElement | null = null;

	/** Result's turns values container. */
	public resultsValueContainer: HTMLElement | null = null;

	/** Render component. */
	public render(): void {
		const resultTurnsTitle = document.createElement('p');
		resultTurnsTitle.className = 'result_item__moves-subtitle typography-subtitle';
		resultTurnsTitle.textContent = 'Moves';

		const resultTurnsData = document.createElement('p');
		resultTurnsData.className = 'result-item__moves-data typography-body';

		const resultTurns = document.createElement('div');
		resultTurns.className = 'result-item__moves';

		resultTurns.appendChild(resultTurnsTitle);
		resultTurns.appendChild(resultTurnsData);

		this.resultsContainer = resultTurns;
		this.resultsValueContainer = resultTurnsData;
	}

	/**
	 * Update data.
	 * @param message Turns results.
	 */
	public update(message: number[]): void {
		if (this.resultsValueContainer === null) {
			return;
		}

		this.resultsValueContainer.textContent = message.join('');
	}
}
