/** Result root component's props. */
export interface ResultComponentProps {

	/** Result info component. */
	readonly resultInfo: HTMLElement | null;

	/** Result indicator. */
	readonly resultStatus: HTMLElement | null;

	/** Result turns. */
	readonly resultTurns: HTMLElement | null;

	/** Additional class name. */
	readonly className?: string;
}
