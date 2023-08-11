import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { ApiUrlsConfig } from '../apiUrlsConfig';
import { UserSecretService } from '../services/userSecretService';
import { AuthService } from '../services/authServices';
import { http } from '..';

export type SecretRefreshResult = Promise<AxiosResponse<unknown, unknown>>;

/**
 * Refresh secret interceptor.
 * @param error Server error.
 * @param refreshCallback Callback to refresh secret.
 */
export async function refreshSecretInterceptor(error: AxiosError): SecretRefreshResult {

	if (error.config == null ||
    !shouldRefreshSecretForUrl(error.config) ||
    (error.response != null && error.response.status !== 401)
	) {
		throw error;
	}

	const result = await refreshSecret(error);
	return result;
}

const refreshSecret = async(error: AxiosError): SecretRefreshResult => {
	const secret = await UserSecretService.getToken();

	if (secret == null || error.config == null) {
		throw error;
	}

	try {
		const newSecret = await AuthService.refreshSecret(secret);
		await UserSecretService.saveToken(newSecret);
		return http.request(error.config);
	} catch (err: unknown) {
		await AuthService.logout();
		throw err;
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