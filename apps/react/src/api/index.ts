import axios from 'axios';

import { CONFIG } from './config';

export const http = axios.create({
	baseURL: CONFIG.apiUrl,
});
