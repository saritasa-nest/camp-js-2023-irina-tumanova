import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { ApiUrlsConfig } from '../apiUrlsConfig';
import { UserSecretService } from '../services/userSecret';
import { AuthService } from '../services/auth';
import { http } from '..';

export type RefreshResult = Promise<AxiosResponse<unknown, unknown>>;

/**
 * Refresh secret interceptor.
 * @param error Server error.
 * @param refreshCallback Callback to refresh secret.
 */
export function refreshSecretInterceptor(error: AxiosError): RefreshResult {
	if (
		error.config == null ||
		!shouldRefreshSecretForUrl(error.config) ||
		(error.response != null && error.response.status !== 401)
	) {
		throw error;
	}

	return refreshSecret(error);
}

const refreshSecret = async(requestError: AxiosError): RefreshResult => {
	const secret = UserSecretService.getToken();
	if (secret === null || requestError.config === undefined) {
		throw requestError;
	}

	try {
		const newSecret = await AuthService.refreshSecret(secret);
		UserSecretService.saveToken(newSecret);
		return http.request(requestError.config);
	} catch (error: unknown) {
		AuthService.logout();
		throw error;
	}
};

/**
 * Checks request should be intercepted.
 * @param config Request config.
 */
export function shouldRefreshSecretForUrl(config: AxiosRequestConfig): boolean {
	if (config.url === undefined) {
		return false;
	}

	return !ApiUrlsConfig.isAuthUrl(config.url);
}
