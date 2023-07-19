import { Injectable, inject } from '@angular/core';

import { AppConfig } from './app.config';

/** Urls used within the application. */
@Injectable({ providedIn: 'root' })
export class AppUrlsConfig {

	public constructor(private readonly appConfig: AppConfig) {}

	/** Anime routes. */
	public readonly anime = {
		getAnime: this.toApi('/anime/anime/'),
	};

	private toApi(path: string): string {
		return `${this.appConfig.apiUrl}${path}`;
	}
}
