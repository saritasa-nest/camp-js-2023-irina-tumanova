import { createResultElementHtml } from './utils';
import { DisplayResult, ISubscriber, DisplayStatus } from './types';

/** Result block display class. */
export class UIStatusDisplayer implements ISubscriber<DisplayResult> {

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

		this.createElement(containerHtml, scoreName, className);
	}

	/**
	 * Update data.
	 * @param message Display information.
	 */
	public update(message: DisplayResult): void {
		if (this.resultHtml === null || this.resultTurnsDataHtml === null || this.resultScoreHtml === null) {
			return;
		}

		this.resultHtml.classList.remove(DisplayStatus.Active);
		if (message.status.length > 0) {
			this.resultHtml.className += ` ${message.status.join(' ')}`;
		}

		this.resultTurnsDataHtml.textContent = message.turnValues.join('');
		this.resultScoreHtml.textContent = `${message.turnValues.reduce((prev, next) => prev + next, 0)} points`;
	}

	/**
	 * Create result item block.
	 * @param parent Parent element.
	 * @param name Result name.
	 * @param className Result element class name.
	 */
	public createElement(parent: Element, name: string, className?: string): void {
		const { resultHtml, resultTurnsDataHtml, resultScoreHtml } = createResultElementHtml(parent, name, className);

		this.resultHtml = resultHtml;
		this.resultTurnsDataHtml = resultTurnsDataHtml;
		this.resultScoreHtml = resultScoreHtml;
	}
}
