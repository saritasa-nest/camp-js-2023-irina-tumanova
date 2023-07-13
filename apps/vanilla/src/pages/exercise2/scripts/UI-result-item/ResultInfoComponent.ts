import { ISubscriber, ResultsMessage } from '../types';

/** Result info component. */
export class ResultInfoComponent implements ISubscriber<ResultsMessage> {

	/** Result's turns element. */
	public resultInfoElement: HTMLElement | null = null;

	/** Result's score element. */
	public resultScoreElement: HTMLElement | null = null;

	/**
	 * Render component.
	 * @param name Name of a score.
	 * */
	public render(name: string): void {
		const resultName = document.createElement('p');
		resultName.className = 'result-item__player-name typography-subtitle';
		resultName.textContent = name;

		const resultScore = document.createElement('p');
		resultScore.className = 'result-item__player-points typography-subtitle';
		resultScore.textContent = '0 points';

		const resultInfo = document.createElement('div');
		resultInfo.className = 'result-item__player-info';

		resultInfo.appendChild(resultName);
		resultInfo.appendChild(resultScore);

		this.resultInfoElement = resultInfo;
		this.resultScoreElement = resultScore;
	}

	/**
	 * Update data.
	 * @param message Display information.
	 */
	public update(message: ResultsMessage): void {
		if (this.resultScoreElement === null) {
			return;
		}

		this.resultScoreElement.textContent = `${message.results.reduce((prev, next) => prev + next, 0)} points`;
	}
}
