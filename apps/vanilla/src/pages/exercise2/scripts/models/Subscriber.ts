/** Subscriber. */
export interface Subscriber<T>{

	/** Update subscriber. */
	readonly update: (value: T) => void;
}
