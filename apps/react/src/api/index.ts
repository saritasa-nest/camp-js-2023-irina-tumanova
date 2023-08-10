import axios from 'axios';

import { CONFIG } from './config';
import { errorInterceptor } from './interseptors/errorInterseptor';

export const http = axios.create({
	baseURL: CONFIG.apiUrl,
	headers: {
		'Api-Key': CONFIG.apiKey,
	},
});

http.interceptors.response.use(response => response,
	error => {
		errorInterceptor(error);
	});
