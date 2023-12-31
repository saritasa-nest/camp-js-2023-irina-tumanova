import { Subscriber } from '../models/Subscriber';
import { ResultComponentProps } from './types';

/** Result component. */
export class ResultComponent implements Subscriber<boolean> {

	/** Result element. */
	public resultElement: HTMLElement | null = null;

	/**
	 * Render component.
	 * @param resultInfo Component result information (name + score).
	 * @param resultIndicator Component result activity indicator.
	 * @param resultTurns Component result turns values.
	 * @param className Component class name.
	 */
	public render({ resultInfo, resultStatus, resultTurns, className }: ResultComponentProps): void {
		const parentContainerHtml = document.querySelector('.blackjack__results');

		if (parentContainerHtml === null) {
			return;
		}

		const result = document.createElement('div');
		result.className = `blackjack__result-item result-item ${className ?? ''}`;

		if (resultInfo !== null) {
			result.appendChild(resultInfo);
		}
		if (resultStatus !== null) {
			result.appendChild(resultStatus);
		}
		if (resultTurns !== null) {
			result.appendChild(resultTurns);
		}

		parentContainerHtml.appendChild(result);

		this.resultElement = result;
	}

	/**
	 * Update data.
	 * @param isWinner Is winner result.
	 */
	public update(isWinner: boolean): void {
		if (this.resultElement === null) {
			return;
		}

		if (isWinner) {
			this.resultElement.classList.add('result-item_winner');
		}
	}
}
