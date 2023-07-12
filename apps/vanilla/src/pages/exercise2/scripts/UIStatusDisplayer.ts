import { createResultElementHtml } from './utils';
import { DisplayResultStatus, ISubscriber, EDisplayStatus } from './types';

/** Result block display class. */
export class UIStatusDisplayer implements ISubscriber<DisplayResultStatus> {

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

	/**
	 * Update data.
	 * @param message Display information.
	 */
	public update(message: DisplayResultStatus): void {
		if (this.resultHtml === null || this.resultMovesHtml === null || this.resultScoreHtml === null) {
			return;
		}

		this.resultHtml.classList.remove(EDisplayStatus.Active);
		if (message.status.length > 0) {
			this.resultHtml.className += ` ${message.status.join(' ')}`;
		}

		this.resultMovesHtml.textContent = message.rollValues.join('');
		this.resultScoreHtml.textContent = `${message.rollValues.reduce((prev, next) => prev + next, 0)} points`;
	}

	/**
	 * Create result item block.
	 * @param parent Parent element.
	 * @param name Result name.
	 * @param className Result element class name.
	 */
	public createElement(parent: Element, name: string, className?: string): void {
		const { resultHtml, resultMovesDataHtml, resultScoreHtml } = createResultElementHtml(parent, name, className);

		this.resultHtml = resultHtml;
		this.resultMovesHtml = resultMovesDataHtml;
		this.resultScoreHtml = resultScoreHtml;
	}
}
