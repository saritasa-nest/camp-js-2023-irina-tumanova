import { ISubscriber } from './types';

/** Random dice generator. */
export class Publisher<T> {

	/** Subscribers. */
	public subscribers: ISubscriber<T>[] = [];

	/** Function subscribe of changes..
	 * @param subscriber - Added subscriber.
	 */
	public subscribe(subscriber: ISubscriber<T>): void {
		this.subscribers = [...this.subscribers, subscriber];
	}

	/** Function unsubscribe of changes.
	 * @param subscriber - Deleted subscriber.
	 */
	public unsubscribe(subscriber: ISubscriber<T>): void {
		this.subscribers = this.subscribers.filter(currentSubscribe => currentSubscribe !== subscriber);
	}

	/** Function notify updating.
	 * @param data - Data for update.
	 */
	public notify(data: T): void {
		this.subscribers.forEach(subscriber => {
			subscriber.update(data);
		});
	}
}
