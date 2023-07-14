import { ISubscriber } from './types';

/** Publisher. */
export class Publisher<T> {

	/** Subscribers. */
	private subscribers: Set<ISubscriber<T>> = new Set();

	/**
	 * Subscribe of changes..
	 * @param subscriber Added subscriber.
	 */
	public subscribe(subscriber: ISubscriber<T>): void {
		this.subscribers.add(subscriber);
	}

	/**
	 * Unsubscribe of changes.
	 * @param subscriber Deleted subscriber.
	 */
	public unsubscribe(subscriber: ISubscriber<T>): void {
		this.subscribers.delete(subscriber);
	}

	/**
	 * Notify updating.
	 * @param message Data for update.
	 */
	public notify(message: T): void {
		this.subscribers.forEach(subscriber => {
			subscriber.update(message);
		});
	}
}
