import { ISubscriber } from './types';

/** Publisher. */
export class Publisher<T> {

	/** Subscribers. */
	public subscribers: ISubscriber<T>[] = [];

	/**
	 * Subscribe of changes..
	 * @param subscriber - Added subscriber.
	 */
	public subscribe(subscriber: ISubscriber<T>): void {
		this.subscribers = [...this.subscribers, subscriber];
	}

	/**
	 * Unsubscribe of changes.
	 * @param subscriber - Deleted subscriber.
	 */
	public unsubscribe(subscriber: ISubscriber<T>): void {
		this.subscribers = this.subscribers.filter(currentSubscribe => currentSubscribe !== subscriber);
	}

	/**
	 * Notify updating.
	 * @param data - Data for update.
	 */
	public notify(data: T): void {
		this.subscribers.forEach(subscriber => {
			subscriber.update(data);
		});
	}
}
