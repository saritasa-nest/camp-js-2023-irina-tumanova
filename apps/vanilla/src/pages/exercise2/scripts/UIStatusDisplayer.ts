import { createResultElementHtml } from './createResultElement';
import { IDisplayStatusData, ISubscriber, TDisplayStatus } from './types';

/** Result block display class. */
export class UIStatusDisplayer implements ISubscriber<IDisplayStatusData> {

	/** Result item html. */
	private resultHtml: HTMLElement | null = null;

	/** Result's moves container html. */
	private resultMovesHtml: HTMLElement | null = null;

	/** Result's score. */
	private resultScoreHtml: HTMLElement | null = null;

	public constructor(scoreName: string, className?: string) {
		const containerHtml = document.querySelector('.blackjack__results');

		if (containerHtml === null) {
			return;
		}

		this.createElement(containerHtml, scoreName, className);
	}

	/** Function update data.
	 * @param data - Game move data.
	 */
	public update(data: IDisplayStatusData): void {
		if (this.resultHtml === null || this.resultMovesHtml === null || this.resultScoreHtml === null) {
			return;
		}

		this.resultHtml.classList.remove(TDisplayStatus.Active);
		if (data.status.length > 0) {
			this.resultHtml.className += ` ${data.status.join(' ')}`;
		}

		if (data.results === undefined) {
			return;
		}
		const diceSideHtml = document.createElement('p');
		diceSideHtml.innerText = `${data.results[data.results.length - 1]}`;
		this.resultMovesHtml.appendChild(diceSideHtml);
		this.resultScoreHtml.textContent = `${data.results.reduce((prev, next) => prev + next, 0)} points`;
	}

	/** Function result block creation .
	 * @param parent - Parent element.
	 * @param name - Result name.
	 * @param className - Result element class name.
	 */
	public createElement(parent: Element, name: string, className?: string): void {
		const { resultHtml, resultMovesDataHtml, resultScoreHtml } = createResultElementHtml(parent, name, className);

		this.resultHtml = resultHtml;
		this.resultMovesHtml = resultMovesDataHtml;
		this.resultScoreHtml = resultScoreHtml;
	}
}
