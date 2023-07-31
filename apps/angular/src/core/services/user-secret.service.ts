import { Injectable, inject } from '@angular/core';
import { Observable, Subject, merge, tap } from 'rxjs';
import { UserSecret } from '@js-camp/core/models/auth/user-secret';

import { StorageService } from './storage.service';

const SECRET_KEY = 'SECRET';

/** User secret service. */
@Injectable({
	providedIn: 'root',
})
export class UserSecretService {

	private readonly userSecret$: Observable<UserSecret | null>;

	private readonly userSecretUpdated$ = new Subject<UserSecret | null>();

	private readonly storageService = inject(StorageService);

	public constructor() {
		const tokenFromStorage$ = this.storageService.get<UserSecret>(SECRET_KEY);
		this.userSecret$ = merge(tokenFromStorage$, this.userSecretUpdated$);
	}

	/** Get user secret from local storage. */
	public getTokens(): Observable<UserSecret | null> {
		return this.userSecret$;
	}

	/**
	 * Save user secret to local storage.
	 * @param token Token received from server.
	 */
	public saveToken(token: UserSecret): Observable<void> {
		return this.storageService.set(SECRET_KEY, token).pipe(tap(() => this.userSecretUpdated$.next(token)));
	}

	/** Destroy user secret from local storage. */
	public destroyToken(): Observable<void> {
		return this.storageService.remove(SECRET_KEY).pipe(tap(() => this.userSecretUpdated$.next(null)));
	}
}
