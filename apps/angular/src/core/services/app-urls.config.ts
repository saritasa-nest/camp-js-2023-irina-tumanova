import { Injectable, inject } from '@angular/core';

import { AppConfig } from './app.config';

/** Urls used within the application. */
@Injectable({ providedIn: 'root' })
export class AppUrlsConfig {

	private readonly appConfig = inject(AppConfig);

	/** Anime routes. */
	public readonly anime = {
		get: this.toApi('anime/anime/'),
	};

	/** Auth routes. */
	public readonly auth = {
		login: this.toApi('auth/login/'),
		register: this.toApi('auth/register/'),
	};

	private toApi(...args: readonly string[]): string {
		const path = args.join('/');
		return new URL(path, this.appConfig.apiUrl).toString();
	}
}
