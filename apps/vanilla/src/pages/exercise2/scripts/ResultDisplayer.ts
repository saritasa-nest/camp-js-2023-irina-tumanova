import { TurnResultsForDisplay, ISubscriber } from './types';

/** Result block display class. */
export class ResultDisplayer implements ISubscriber<TurnResultsForDisplay> {

	/** Result item html. */
	private resultHtml: HTMLElement | null = null;

	/** Result's moves container html. */
	private resultTurnsDataHtml: HTMLElement | null = null;

	/** Result's score. */
	private resultScoreHtml: HTMLElement | null = null;

	public constructor(scoreName: string, className?: string) {
		const containerHtml = document.querySelector('.blackjack__results');

		if (containerHtml === null) {
			return;
		}

		const result = this.createResultRootElement(className);
		const { resultInfo, resultScore } = this.createResultInfoElement(scoreName);
		const resultIndicatorHtml = this.createResultIndicatorElement();
		const { resultTurns, resultTurnsData } = this.createResultTurnsElement();

		result.appendChild(resultInfo);
		result.appendChild(resultIndicatorHtml);
		result.appendChild(resultTurns);

		containerHtml.appendChild(result);

		this.resultHtml = result;
		this.resultTurnsDataHtml = resultTurnsData;
		this.resultScoreHtml = resultScore;

	}

	/**
	 * Update data.
	 * @param message Display information.
	 */
	public update(message: TurnResultsForDisplay): void {
		if (this.resultHtml === null || this.resultTurnsDataHtml === null || this.resultScoreHtml === null) {
			return;
		}

		if (message.isActive) {
			this.resultHtml.classList.add('result-item_active');
		} else {
			this.resultHtml.classList.remove('result-item_active');
		}

		if (message.isWinner) {
			this.resultHtml.classList.add('result-item_winner');
		}

		this.resultTurnsDataHtml.textContent = message.turnResults.join('');
		this.resultScoreHtml.textContent = `${message.turnResults.reduce((prev, next) => prev + next, 0)} points`;
	}

	private createResultRootElement(className?: string): HTMLElement {
		const result = document.createElement('div');
		result.className = `blackjack__result-item result-item ${className ?? ''}`;

		return result;
	}

	private createResultInfoElement(playerName: string): {resultInfo: HTMLElement; resultScore: HTMLElement;} {
		const resultName = document.createElement('p');
		resultName.className = 'result-item__player-name typography-subtitle';
		resultName.textContent = playerName;

		const resultScore = document.createElement('p');
		resultScore.className = 'result-item__player-points typography-subtitle';
		resultScore.textContent = '0 points';

		const resultInfo = document.createElement('div');
		resultInfo.className = 'result-item__player-info';

		resultInfo.appendChild(resultName);
		resultInfo.appendChild(resultScore);

		return { resultInfo, resultScore };
	}

	private createResultIndicatorElement(): HTMLElement {
		const resultIndicator = document.createElement('div');
		resultIndicator.className = 'result_item__indicator';
		return resultIndicator;
	}

	private createResultTurnsElement(): {resultTurns: HTMLElement; resultTurnsData: HTMLElement;} {
		const resultTurnsTitle = document.createElement('p');
		resultTurnsTitle.className = 'result_item__moves-subtitle typography-subtitle';
		resultTurnsTitle.textContent = 'Moves';

		const resultTurnsData = document.createElement('p');
		resultTurnsData.className = 'result-item__moves-data typography-body';

		const resultTurns = document.createElement('div');
		resultTurns.className = 'result-item__moves';

		resultTurns.appendChild(resultTurnsTitle);
		resultTurns.appendChild(resultTurnsData);

		return { resultTurns, resultTurnsData };
	}
}
