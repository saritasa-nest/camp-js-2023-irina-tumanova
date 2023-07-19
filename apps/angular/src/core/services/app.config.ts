import { environment } from '@js-camp/angular/environments/environment';
import { Injectable } from '@angular/core';

/** App config. */
@Injectable()
export class AppConfig {

	/** Api URL. */
	public readonly apiUrl = environment.apiUrl;

	/** Api key for headers. */
	public readonly apiKey = environment.apiKey;
}
