import { Injectable, inject } from '@angular/core';

import { AppConfig } from './app.config';

/** Urls used within the application. */
@Injectable({ providedIn: 'root' })
export class AppUrlsConfig {

	private readonly appConfig = inject(AppConfig);

	/** Anime routes. */
	public readonly anime = {
		getAnime: this.toApi('anime/anime/'),
	};

	private toApi(...args: readonly string[]): string {
		const path = args.join('/');
		return new URL(path, this.appConfig.apiUrl).toString();
	}
}