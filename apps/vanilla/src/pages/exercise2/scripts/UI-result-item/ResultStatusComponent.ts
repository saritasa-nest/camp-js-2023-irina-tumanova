import { ISubscriber, IsActiveMessage } from '../types';

/** Result status component. */
export class ResultStatusComponent implements ISubscriber<IsActiveMessage> {

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
	 * @param message Display information.
	 */
	public update(message: IsActiveMessage): void {
		if (this.resultStatusElement === null) {
			return;
		}

		if (message.isActive) {
			this.resultStatusElement.classList.add('result_item__indicator_active');
		} else {
			this.resultStatusElement.classList.remove('result_item__indicator_active');
		}
	}
}
