import { InternalAxiosRequestConfig } from 'axios';

import { UserSecretService } from '../services/userSecretService';
import { ApiUrlsConfig } from '../apiUrlsConfig';

/**
 * Intercept token.
 * @param config Request config.
 */
export async function addTokenInterceptor(config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> {
	if (!shouldInterceptWithToken(config)) {
		return config;
	}
	const token = await UserSecretService.getToken();
	if (token === null) {
		return config;
	}

	config.headers.set('Authorization', `Bearer ${token.access}`);
	return config;
}

/**
 * Check request should be intercept with token.
 * @param config Request config.
 *
 */
function shouldInterceptWithToken(config: InternalAxiosRequestConfig): boolean {
	return !ApiUrlsConfig.isAuthUrl(config.url ?? '');
}
