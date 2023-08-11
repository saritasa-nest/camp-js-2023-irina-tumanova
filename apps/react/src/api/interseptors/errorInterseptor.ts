import { AxiosError, AxiosResponse } from 'axios';

/**
 * Intercept error .
 * @param error Axios error object.
 */
export function errorInterceptor(error: AxiosError): Promise<AxiosResponse<unknown, unknown>> {
	throw error;
}
