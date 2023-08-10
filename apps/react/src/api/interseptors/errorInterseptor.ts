import { AxiosError } from 'axios';

import { UserSecretService } from '../services/userSecretService';

/**
 * Intercept error .
 * @param error Axios error object.
 */
export function errorInterceptor(error: AxiosError): void {
	if (error.response?.status === 401) {
		UserSecretService.destroyToken();
	}
	throw error;
}
