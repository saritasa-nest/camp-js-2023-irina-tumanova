/** Local storage service. */
export namespace LocalStorageService {

	/**
	 * Set data to localStorage.
	 * @param key Key.
	 * @param value Value.
	 */
	export function set<T>(key: string, value: T): void {
		return localStorage.setItem(key, JSON.stringify(value));
	}

	/**
	 * Get data from localStorage.
	 * @param key Store key.
	 */
	export function get<T>(key: string): T | null {
		const value = localStorage.getItem(key);

		if (value !== null) {
			return JSON.parse(value) as T;
		}
		return null;
	}

	/**
	 * Remove data from localStorage.
	 * @param key Store key.
	 */
	export function remove(key: string): void {
		localStorage.removeItem(key);
	}
}
