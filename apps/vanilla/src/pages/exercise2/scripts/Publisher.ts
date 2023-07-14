import { Subscriber } from './models/Subscriber';

/** Publisher. */
export class Publisher<T> {

	/** Subscribers. */
	private subscribers: Set<Subscriber<T>> = new Set();

	/**
	 * Subscribe of changes..
	 * @param subscriber Added subscriber.
	 */
	public subscribe(subscriber: Subscriber<T>): void {
		this.subscribers.add(subscriber);
	}

	/**
	 * Unsubscribe of changes.
	 * @param subscriber Deleted subscriber.
	 */
	public unsubscribe(subscriber: Subscriber<T>): void {
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
