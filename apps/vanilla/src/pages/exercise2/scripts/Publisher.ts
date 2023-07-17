import { Subscriber } from './models/Subscriber';

/** Publisher. */
export class Publisher<T> {

	/** Subscribers. */
	private readonly subscribers: Set<Subscriber<T>> = new Set();

	/**
	 * Subscribe of changes.
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
	 * @param value Data for update.
	 */
	public notify(value: T): void {
		this.subscribers.forEach(subscriber => {
			subscriber.update(value);
		});
	}
}
