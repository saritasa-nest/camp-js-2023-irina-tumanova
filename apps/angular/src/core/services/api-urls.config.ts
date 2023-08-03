import { Injectable, inject } from '@angular/core';

import { AppConfig } from './app.config';

const AUTH_URL_PATH = 'auth';

/** Urls used within the application. */
@Injectable({ providedIn: 'root' })
export class ApiUrlsConfig {

	private readonly appConfig = inject(AppConfig);

	/** Anime routes. */
	public readonly anime = {
		get: this.toApi('anime/anime/'),
		getDetail: (id: number | string) => this.toApi(`anime/anime/${id}/`),
		delete: (id: number | string) => this.toApi(`anime/anime/${id}/`),
		edit: (id: number | string) => this.toApi(`anime/anime/${id}/`),
		create: this.toApi('anime/anime/'),
	};

	/** Genre routes. */
	public readonly genre = {
		get: this.toApi('anime/genres/'),
		create: this.toApi('anime/genres/'),
	};

	/** Studio routes. */
	public readonly studio = {
		get: this.toApi('anime/studios/'),
		create: this.toApi('anime/studios/'),
	};

	/** Auth routes. */
	public readonly auth = {
		login: this.toApi(`${AUTH_URL_PATH}/login/`),
		register: this.toApi(`${AUTH_URL_PATH}/register/`),
		refreshSecret: this.toApi(`${AUTH_URL_PATH}/token/refresh/`),
	};

	private toApi(...args: readonly string[]): string {
		const path = args.join('/');
		return new URL(path, this.appConfig.apiUrl).toString();
	}

	/**
	 * Check if the link belongs to the application.
	 * @param url Request url.
	 */
	public isAppUrl(url: string): boolean {
		return url.startsWith(this.appConfig.apiUrl);
	}

	/**
	 * Check if the link belongs to the auth.
	 * @param url Request url.
	 */
	public isAuthUrl(url: string): boolean {
		return url.includes(AUTH_URL_PATH);
	}
}
