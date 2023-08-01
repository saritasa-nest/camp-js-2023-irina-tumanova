import { Injectable } from '@angular/core';
import { Observable, defer, of } from 'rxjs';

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
	public set<T>(key: string, value: T): Observable<void> {
		return defer(async() => {
			await localStorage.setItem(key, JSON.stringify(value));
		});
	}

	/**
	 * Get data from localStorage.
	 * @param key Store key.
	 */
	public get<T>(key: string): Observable<T | null> {
		const value = localStorage.getItem(key);
		if (value === null || value === '') {
			return of(null);
		}

		return defer(async() => await JSON.parse(value) as T);
	}

	/**
	 * Remove data from localStorage.
	 * @param key Store key.
	 */
	public remove(key: string): Observable<void> {
		return defer(async() => {
			await localStorage.removeItem(key);
		});
	}
}
