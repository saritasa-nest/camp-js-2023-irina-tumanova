import { UserSecret } from '@js-camp/core/models/auth/user-secret';

import { LocalStorageService } from './localStorageService';

export namespace UserSecretService {

	const SECRET_KEY = 'SECRET';

	/** Get user secret from local storage. */
	export function getTokens(): Promise<UserSecret | null> {
		return LocalStorageService.get<UserSecret>(SECRET_KEY);
	}

	/**
	 * Save user secret to local storage.
	 * @param token Token received from server.
	 */
	export function saveToken(token: UserSecret): Promise<void> {
		return LocalStorageService.set(SECRET_KEY, token);
	}

	/** Destroy user secret from local storage. */
	export function destroyToken(): Promise<void> {
		return LocalStorageService.remove(SECRET_KEY);
	}
}
