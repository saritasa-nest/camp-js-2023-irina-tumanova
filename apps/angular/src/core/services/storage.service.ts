import { Injectable } from '@angular/core';

/** Storage service. */
@Injectable({
	providedIn: 'root',
})
export class StorageService {

	/**
	 * Set data to localStorage.
	 * @param key Key.
	 * @param value Value.
	 */
	public async set<T>(key: string, value: T): Promise<void> {
		await localStorage.setItem(key, JSON.stringify(value));
	}

	/**
	 * Get data from localStorage.
	 * @param key Store key.
	 */
	public async get<T>(key: string): Promise<T | null> {
		const value = localStorage.getItem(key);
		if (value === null || value === '') {
			return null;
		}
		return await JSON.parse(value) as T;
	}

	/**
	 * Remove data from localStorage.
	 * @param key Store key.
	 */
	public async remove(key: string): Promise<void> {
		await localStorage.removeItem(key);
	}
}
