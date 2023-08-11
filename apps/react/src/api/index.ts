import axios from 'axios';

import { CONFIG } from './config';
import { errorInterceptor } from './interseptors/errorInterseptor';
import { addTokenInterceptor } from './interseptors/addTokenInterseptor';
import { refreshSecretInterceptor } from './interseptors/refreshTokenInterceptor';

export const http = axios.create({
	baseURL: CONFIG.apiUrl,
	headers: {
		'Api-Key': CONFIG.apiKey,
	},
});

http.interceptors.request.use(config => addTokenInterceptor(config),
	error => Promise.reject(error));

http.interceptors.response.use(response => response,
	error => refreshSecretInterceptor(error));

http.interceptors.response.use(response => response,
	error => errorInterceptor(error));
