import { environment } from '@js-camp/angular/environments/environment';
import { Injectable } from '@angular/core';

/** App config. */
@Injectable({ providedIn: 'root' })
export class AppConfig {

	/** API URL. */
	public readonly apiUrl = environment.apiUrl;

	/** API key for headers. */
	public readonly apiKey = environment.apiKey;
}
