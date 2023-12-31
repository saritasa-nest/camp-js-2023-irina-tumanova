import { Subscriber } from '../models/Subscriber';

/** Result status component. */
export class ResultStatusComponent implements Subscriber<boolean> {

	/** Result's status element. */
	public resultStatusElement: HTMLElement | null = null;

	/** Render component. */
	public render(): void {
		const resultStatus = document.createElement('div');
		resultStatus.className = 'result_item__indicator';
		this.resultStatusElement = resultStatus;
	}

	/**
	 * Update data.
	 * @param isActive Is active player result.
	 */
	public update(isActive: boolean): void {
		if (this.resultStatusElement === null) {
			return;
		}

		if (isActive) {
			this.resultStatusElement.classList.add('result_item__indicator_active');
		} else {
			this.resultStatusElement.classList.remove('result_item__indicator_active');
		}
	}
}
