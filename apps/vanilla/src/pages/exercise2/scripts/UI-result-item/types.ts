/** Result root component's props. */
export interface ResultComponentProps {

	/** Result info component. */
	resultInfo: HTMLElement | null;

	/** Result indicator. */
	resultStatus: HTMLElement | null;

	/** Result turns. */
	resultTurns: HTMLElement | null;

	/** Additional class name. */
	className?: string;
}
