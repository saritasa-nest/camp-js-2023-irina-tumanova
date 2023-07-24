import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, defer, merge, tap } from 'rxjs';

import { StorageService } from './storage.service';

const TOKEN_KEY = 'TOKENS';

/** Auth service. */
@Injectable({
	providedIn: 'root',
})
export class JwtService {

	/** Token observer. */
	private readonly token$: Observable<Token | null>;

	public constructor(private readonly storageService: StorageService) {
		const tokenFromStorage$ = defer(() => this.storageService.get<Token>(TOKEN_KEY));
		this.token$ = merge(tokenFromStorage$);
	}

	/** Get token from local storage. */
	public getTokens(): Observable<Token | null> {
		return this.token$;
	}

	/**
	 * Save token to local storage.
	 * @param token Token received from server.
	 */
	public saveToken(token: Token): Observable<void> {
		return defer(() => this.storageService.set(TOKEN_KEY, token)).pipe(tap(() => this.tokenUpdated$.next(token)));
	}

	/** Destroy token from local storage. */
	public destroyToken(): Observable<void> {
		return defer(() => this.storageService.remove(TOKEN_KEY)).pipe(tap(() => this.tokenUpdated$.next(null)));
	}
}
