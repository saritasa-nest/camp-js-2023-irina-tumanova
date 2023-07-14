/** Subscriber. */
export interface Subscriber<T>{

	/** Update subscriber. */
	readonly update: (message: T) => void;
}
