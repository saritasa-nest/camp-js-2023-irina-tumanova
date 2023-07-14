import { ISubscriber } from '../types';

import { ResultComponentProps } from './types';

/** Result component. */
export class ResultComponent implements ISubscriber<boolean> {

	/** Result element. */
	public resultElement: HTMLElement | null = null;

	/**
	 * Render component.
	 * @param resultInfo Component result information (name + score).
	 * @param resultIndicator Component result activity indicator.
	 * @param resultTurns Component result turns values.
	 * @param className Component class name.
	 * */
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
	 * @param message Display information.
	 */
	public update(message: boolean): void {
		if (this.resultElement === null) {
			return;
		}

		if (message) {
			this.resultElement.classList.add('result-item_winner');
		}
	}
}
