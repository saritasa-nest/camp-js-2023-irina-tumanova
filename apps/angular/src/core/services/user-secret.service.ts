import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';

import { UserSecret } from '@js-camp/core/models/auth/user-secret';

import { StorageService } from './storage.service';

const SECRET_KEY = 'SECRET';

/** User secret service. */
@Injectable({
	providedIn: 'root',
})
export class UserSecretService {

	private readonly userSecret$: Observable<UserSecret | null>;

	private readonly userSecretUpdateTrigger$ = new BehaviorSubject<void>(undefined);

	private readonly storageService = inject(StorageService);

	public constructor() {
		this.userSecret$ = this.userSecretUpdateTrigger$.pipe(
			switchMap(() => this.storageService.get<UserSecret>(SECRET_KEY)),
		);
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
		return this.storageService.set(SECRET_KEY, token).pipe(tap(() => this.userSecretUpdateTrigger$.next()));
	}

	/** Destroy user secret from local storage. */
	public destroyToken(): Observable<void> {
		return this.storageService.remove(SECRET_KEY).pipe(tap(() => this.userSecretUpdateTrigger$.next()));
	}
}
