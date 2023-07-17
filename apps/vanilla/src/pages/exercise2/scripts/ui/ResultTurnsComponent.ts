import { Subscriber } from '../models/Subscriber';

/** Result block display class. */
export class ResultTurnsComponent implements Subscriber<number[]> {

	/** Results's turns container. */
	public resultTurnsElement: HTMLElement | null = null;

	/** Result's turns values container. */
	public resultTurnsDataElement: HTMLElement | null = null;

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

		this.resultTurnsElement = resultTurns;
		this.resultTurnsDataElement = resultTurnsData;
	}

	/**
	 * Update data.
	 * @param results Turns results.
	 */
	public update(results: number[]): void {
		if (this.resultTurnsDataElement === null) {
			return;
		}

		this.resultTurnsDataElement.textContent = results.join('');
	}
}
