/** Local storage service. */
export namespace LocalStorageService {

	/**
	 * Set data to localStorage.
	 * @param key Key.
	 * @param value Value.
	 */
	export function set<T>(key: string, value: T): Promise<void> {
		return new Promise(resolve => {
			localStorage.setItem(key, JSON.stringify(value));
			resolve();
		});
	}

	/**
	 * Get data from localStorage.
	 * @param key Store key.
	 */
	export function get<T>(key: string): Promise<T | null> {
		return new Promise(resolve => {
			const value = localStorage.getItem(key);

			if (value !== null) {
				resolve(JSON.parse(value) as T);
			}
			resolve(null);
		});

	}

	/**
	 * Remove data from localStorage.
	 * @param key Store key.
	 */
	export function remove(key: string): Promise<void> {
		return new Promise(resolve => {
			localStorage.removeItem(key);
			resolve();
		});
	}
}
